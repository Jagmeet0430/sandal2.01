"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

const services = [
  "AI Product",
  "Automation",
  "Cloud Platform",
  "Digital Product",
  "Strategy",
  "Not sure yet",
];

type SubmitState = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "service" | "details";
type FormErrors = Partial<Record<FieldName, string>>;

type FormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  details: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  details: "",
};

function validateValues(values: FormValues) {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter at least 2 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid work email.";
  }

  if (!services.includes(values.service)) {
    errors.service = "Choose a focus area.";
  }

  if (values.details.trim().length < 20) {
    errors.details = "Share at least 20 characters.";
  }

  return errors;
}

export function ContactCard() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const errors = useMemo(() => validateValues(values), [values]);
  const canSubmit = Object.keys(errors).length === 0 && submitState !== "submitting";

  const visibleError = (field: FieldName) => (submittedOnce || touched[field] ? errors[field] : undefined);

  const updateValue = (field: keyof FormValues) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    if (submitState !== "submitting") {
      setSubmitState("idle");
      setStatusMessage("");
    }
  };

  const markTouched = (field: FieldName) => {
    setTouched((current) => ({
      ...current,
      [field]: true,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedOnce(true);

    if (Object.keys(errors).length > 0) {
      setSubmitState("error");
      setStatusMessage("Please correct the highlighted fields.");
      return;
    }

    setSubmitState("submitting");
    setStatusMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          service: values.service,
          details: values.details,
          message: values.details,
          website: formData.get("website"),
        }),
      });

      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error("Submission failed");
      }

      setSubmitState("success");
      setStatusMessage("Thanks - we received your message. Our team will get back to you shortly.");
      setValues(initialValues);
      setTouched({});
      setSubmittedOnce(false);
    } catch {
      setSubmitState("error");
      setStatusMessage("We couldn't send your message. Please try again or email hello@apexmind.ai.");
    }
  };

  return (
    <aside
      data-contact-card
      className="relative h-auto min-h-0 w-full overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_24px_80px_var(--shadow-color)] sm:p-8 lg:ml-auto lg:max-w-[600px] dark:bg-[#0E0C14] dark:shadow-[0_28px_90px_rgba(0,0,0,0.34)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-purple-500/[0.08] dark:border-purple-200/[0.07]" />
      <div className="pointer-events-none absolute -right-4 top-4 h-32 w-32 rounded-full border border-purple-500/[0.06] dark:border-purple-200/[0.055]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(124,58,237,0.08),transparent_29%)] dark:bg-[radial-gradient(circle_at_78%_10%,rgba(139,92,246,0.16),transparent_31%)]" />

      <div className="relative z-10">
        <ContactHeader />

        <form data-contact-card-item className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="contact-name" label="NAME" error={visibleError("name")}>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={values.name}
                onChange={updateValue("name")}
                onBlur={() => markTouched("name")}
                placeholder="Your name"
                className="contact-input"
                aria-invalid={Boolean(visibleError("name"))}
                aria-describedby="contact-name-error"
              />
            </FormField>

            <FormField id="contact-email" label="WORK EMAIL" error={visibleError("email")}>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={updateValue("email")}
                onBlur={() => markTouched("email")}
                placeholder="you@company.com"
                className="contact-input"
                aria-invalid={Boolean(visibleError("email"))}
                aria-describedby="contact-email-error"
              />
            </FormField>
          </div>

          <FormField id="contact-company" label="COMPANY">
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={updateValue("company")}
              placeholder="Company name"
              className="contact-input"
            />
          </FormField>

          <FormField id="contact-service" label="WHAT DO YOU NEED HELP WITH?" error={visibleError("service")}>
            <select
              id="contact-service"
              name="service"
              required
              value={values.service}
              onChange={updateValue("service")}
              onBlur={() => markTouched("service")}
              className="contact-input appearance-none"
              aria-invalid={Boolean(visibleError("service"))}
              aria-describedby="contact-service-error"
            >
              <option value="" disabled>
                Select a focus area
              </option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="contact-details" label="PROJECT DETAILS" error={visibleError("details")}>
            <textarea
              id="contact-details"
              name="details"
              required
              value={values.details}
              onChange={updateValue("details")}
              onBlur={() => markTouched("details")}
              placeholder="Tell us briefly about the problem, goal, or product you are considering."
              className="contact-input min-h-[132px] resize-y py-3"
              aria-invalid={Boolean(visibleError("details"))}
              aria-describedby="contact-details-error"
            />
          </FormField>

          <SubmitButton state={submitState} disabled={!canSubmit} />

          <FormStatus state={submitState} message={statusMessage} />
          <ResponseTime />
        </form>
      </div>
    </aside>
  );
}

function ContactHeader() {
  return (
    <div data-contact-card-item>
      <p className="ds-small text-[var(--purple)]">
        START A CONVERSATION
      </p>
      <h3 className="ds-h2 mt-4 max-w-[520px]">
        Tell us about your project
      </h3>
      <p className="ds-body mt-4 max-w-[510px]">
        Share the business problem, product idea, workflow, or platform you want to improve.
      </p>
    </div>
  );
}

function SubmitButton({ state, disabled }: { state: SubmitState; disabled: boolean }) {
  const label = state === "submitting" ? "Sending..." : state === "success" ? "Message sent" : state === "error" ? "Try again" : "Start a Conversation";

  return (
    <button
      data-contact-cta
      type="submit"
      disabled={disabled}
      className="mt-1 inline-flex h-[50px] min-h-[50px] w-full items-center justify-center rounded-[14px] bg-[#7C3AED] px-6 text-sm font-extrabold text-white shadow-[0_16px_42px_rgba(124,58,237,0.28)] transition hover:-translate-y-0.5 hover:bg-[#6D28D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]"
    >
      {label}
    </button>
  );
}

function FormStatus({ state, message }: { state: SubmitState; message: string }) {
  return (
    <p
      aria-live="polite"
      className={[
        "min-h-5 text-sm leading-5",
        state === "success" ? "text-emerald-600 dark:text-emerald-300" : "text-[var(--purple)]",
      ].join(" ")}
    >
      {message}
    </p>
  );
}

function ResponseTime() {
  return (
    <div className="flex items-center gap-2 text-sm text-[#746D7C] dark:text-[#928B9B]">
      <span className="size-2 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.48)] dark:bg-cyan-300 dark:shadow-[0_0_14px_rgba(103,232,249,0.65)]" />
      We usually respond within one business day.
    </div>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div data-contact-form-field className="grid gap-2">
      <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#625B6C] dark:text-[#AAA3B3]">
        {label}
      </label>
      {children}
      <p id={`${id}-error`} className="min-h-4 text-xs font-medium leading-4 text-red-600 dark:text-red-300">
        {error ?? ""}
      </p>
    </div>
  );
}
