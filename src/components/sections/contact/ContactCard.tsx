"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const services = [
  "AI & Automation Solutions",
  "Custom Software Development",
  "Web & Mobile Application Development",
  "Cloud & DevOps",
  "AI Consulting",
  "Digital Transformation",
  "MVP Development",
  "Not sure yet",
];

const budgets = [
  "Under INR 80,000",
  "INR 80,000 - INR 2,00,000",
  "INR 2,00,000 - INR 6,00,000",
  "INR 6,00,000+",
  "To be discussed",
];

const timelines = [
  "Immediately",
  "2-4 weeks",
  "1-3 months",
  "3+ months",
  "To be discussed",
];

type SubmitState = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "phone" | "service" | "budget" | "timeline" | "details";
type FormErrors = Partial<Record<FieldName, string>>;

type FormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
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

  if (values.phone.trim().length < 7) {
    errors.phone = "Enter a valid phone or WhatsApp number.";
  }

  if (!services.includes(values.service)) {
    errors.service = "Choose a required service.";
  }

  if (!budgets.includes(values.budget)) {
    errors.budget = "Choose an estimated budget.";
  }

  if (!timelines.includes(values.timeline)) {
    errors.timeline = "Choose a preferred timeline.";
  }

  if (values.details.trim().length < 20) {
    errors.details = "Share at least 20 characters about the project.";
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
          phone: values.phone,
          service: values.service,
          budget: values.budget,
          timeline: values.timeline,
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
      setStatusMessage("We couldn't send your message. Please try again or email hello@alyvora.ai.");
    }
  };

  return (
    <aside
      data-contact-card
      className="relative h-auto min-h-0 w-full overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_24px_80px_var(--shadow-color)] sm:p-6 lg:ml-auto lg:max-w-[660px] dark:bg-[#0E0C14] dark:shadow-[0_28px_90px_rgba(0,0,0,0.34)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-purple-500/[0.08] dark:border-purple-200/[0.07]" />
      <div className="pointer-events-none absolute -right-4 top-4 h-32 w-32 rounded-full border border-purple-500/[0.06] dark:border-purple-200/[0.055]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(124,58,237,0.08),transparent_29%)] dark:bg-[radial-gradient(circle_at_78%_10%,rgba(139,92,246,0.16),transparent_31%)]" />

      <div className="relative z-10">
        <ContactHeader />

        <form data-contact-card-item className="mt-5 grid gap-3.5" onSubmit={handleSubmit} noValidate>
          <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-3.5 sm:grid-cols-2">
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

          <div className="grid gap-3.5 sm:grid-cols-2">
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

            <FormField id="contact-phone" label="PHONE / WHATSAPP" error={visibleError("phone")}>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={values.phone}
                onChange={updateValue("phone")}
                onBlur={() => markTouched("phone")}
                placeholder="+91 98765 43210"
                className="contact-input"
                aria-invalid={Boolean(visibleError("phone"))}
                aria-describedby="contact-phone-error"
              />
            </FormField>
          </div>

          <FormField id="contact-service" label="WHAT DO YOU NEED HELP WITH?" error={visibleError("service")}>
            <SelectShell>
              <select
                id="contact-service"
                name="service"
                required
                value={values.service}
                onChange={updateValue("service")}
                onBlur={() => markTouched("service")}
                className="contact-input appearance-none pr-11"
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
            </SelectShell>
          </FormField>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <FormField id="contact-budget" label="ESTIMATED BUDGET" error={visibleError("budget")}>
              <SelectShell>
                <select
                  id="contact-budget"
                  name="budget"
                  required
                  value={values.budget}
                  onChange={updateValue("budget")}
                  onBlur={() => markTouched("budget")}
                  className="contact-input appearance-none pr-11"
                  aria-invalid={Boolean(visibleError("budget"))}
                  aria-describedby="contact-budget-error"
                >
                  <option value="" disabled>
                    Select a budget
                  </option>
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </FormField>

            <FormField id="contact-timeline" label="PREFERRED TIMELINE" error={visibleError("timeline")}>
              <SelectShell>
                <select
                  id="contact-timeline"
                  name="timeline"
                  required
                  value={values.timeline}
                  onChange={updateValue("timeline")}
                  onBlur={() => markTouched("timeline")}
                  className="contact-input appearance-none pr-11"
                  aria-invalid={Boolean(visibleError("timeline"))}
                  aria-describedby="contact-timeline-error"
                >
                  <option value="" disabled>
                    Select a timeline
                  </option>
                  {timelines.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </FormField>
          </div>

          <FormField id="contact-details" label="PROJECT DETAILS" error={visibleError("details")}>
            <textarea
              id="contact-details"
              name="details"
              required
              value={values.details}
              onChange={updateValue("details")}
              onBlur={() => markTouched("details")}
              placeholder="Tell us about the problem, goal, required features, users, integrations, or product idea."
              className="contact-input min-h-[112px] resize-y py-3"
              aria-invalid={Boolean(visibleError("details"))}
              aria-describedby="contact-details-error"
            />
          </FormField>

          <SubmitButton state={submitState} disabled={submitState === "submitting"} />

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
      <p className="ds-small text-[var(--purple)]">PROJECT ENQUIRY</p>
      <h3 className="mt-3 max-w-[520px] text-[clamp(2rem,3vw,2.7rem)] font-semibold leading-[1.08] tracking-normal text-[var(--text)]">
        Request a project quotation
      </h3>
      <p className="mt-3 max-w-[540px] text-sm leading-7 text-[var(--text-secondary)]">
        Share the essentials. We will review fit, scope, timeline, and the next practical step.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["AI", "Software", "Automation", "Web & Mobile"].map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-secondary)]">
            <CheckCircle2 aria-hidden="true" className="size-3.5 text-emerald-300" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SubmitButton({ state, disabled }: { state: SubmitState; disabled: boolean }) {
  const label = state === "submitting" ? "Sending..." : state === "success" ? "Message sent" : state === "error" ? "Try again" : "Start Your Project";

  return (
    <button
      data-contact-cta
      type="submit"
      disabled={disabled}
      className="mt-1 inline-flex h-[50px] min-h-[50px] w-full items-center justify-center rounded-[14px] bg-[#7C3AED] px-6 text-sm font-extrabold text-white shadow-[0_16px_42px_rgba(124,58,237,0.28)] transition hover:-translate-y-0.5 hover:bg-[#6D28D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED]"
    >
      <span>{label}</span>
      {state === "idle" ? <ArrowRight aria-hidden="true" className="ml-2 size-4 shrink-0" /> : null}
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
    <div className="flex items-start gap-2 text-xs leading-5 text-[#746D7C] dark:text-[#928B9B] sm:text-sm">
      <span className="size-2 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.48)] dark:bg-cyan-300 dark:shadow-[0_0_14px_rgba(103,232,249,0.65)]" />
      Monday-Saturday, 9:00 AM-6:00 PM IST. Online enquiries are open 24/7.
    </div>
  );
}

function SelectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" />
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
