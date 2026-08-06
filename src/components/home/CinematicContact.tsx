"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

const serviceOptions = ["AI Products", "Automation", "Cloud Platforms", "Experience Design", "Other"];

type FormState = "idle" | "submitting" | "success" | "error";

type ContactResponse = {
  success: boolean;
  message: string;
};

export function CinematicContact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      details: String(formData.get("details") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.service || !payload.details) {
      setFormState("error");
      setMessage("Please complete the required fields.");
      return;
    }

    setFormState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.success) {
        setFormState("error");
        setMessage(result.message || "Unable to submit the form right now.");
        return;
      }

      setFormState("success");
      setMessage(result.message);
      form.reset();
    } catch {
      setFormState("error");
      setMessage("Unable to submit the form right now.");
    }
  }

  return (
    <section id="contact" className="cinematic-section px-5 py-28 md:py-36">
      <div className="cinematic-divider" />
      <div className="cinematic-noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,rgba(124,44,255,0.18),transparent_34%)]" />

      <div className="relative z-10 mx-auto grid max-w-[1380px] gap-14 md:grid-cols-[0.9fr_1.1fr] md:px-3 lg:px-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-theme-accent">Start the next build</p>
          <h2 className="mt-7 max-w-[680px] text-5xl font-medium leading-[1.02] tracking-[-0.05em] lg:text-[76px]">
            Your next intelligent product{" "}
            <span className="theme-gradient-text">
              starts here
            </span>
          </h2>
          <p className="mt-7 max-w-[560px] text-base leading-8 text-theme-secondary lg:text-lg">
            Tell us what you want to build, improve, or automate. We will help you understand the best next step.
          </p>

          <div className="relative mt-12 min-h-[300px] overflow-hidden rounded-[32px] border border-theme cinematic-surface p-7 backdrop-blur-xl">
            <div className="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/15" />
            <div className="absolute left-1/2 top-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/20" />
            <div className="absolute inset-x-[16%] bottom-6 h-20 rounded-[50%] bg-purple-600/18 blur-[55px]" />
            <div className="relative z-10 mt-32">
              <a href="mailto:hello@apexmind.ai" className="inline-flex items-center gap-3 text-sm font-semibold text-purple-700 dark:text-purple-100">
                <Mail className="size-4" />
                hello@apexmind.ai
              </a>
              <p className="mt-5 max-w-[420px] text-sm leading-7 text-theme-secondary">
                Share the product, workflow, or system you want to improve. We will respond with the clearest next step.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] border border-theme cinematic-surface-strong p-5 shadow-[0_45px_140px_var(--shadow-color)] backdrop-blur-2xl sm:p-7 lg:p-9"
        >
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" required />
            <Field label="Work email" name="email" type="email" autoComplete="email" required />
            <Field label="Company" name="company" autoComplete="organization" />

            <label className="grid gap-2 text-sm font-semibold text-theme-secondary">
              Service
              <select
                name="service"
                required
                defaultValue=""
                className="h-12 rounded-2xl border border-theme input-theme px-4 text-sm text-theme-primary outline-none transition focus:border-purple-300/60 focus:shadow-[0_0_0_4px_rgba(124,44,255,0.18)]"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 grid gap-2 text-sm font-semibold text-theme-secondary">
            Project details
            <textarea
              name="details"
              required
              rows={7}
              className="resize-none rounded-2xl border border-theme input-theme px-4 py-4 text-sm leading-7 text-theme-primary outline-none transition focus:border-purple-300/60 focus:shadow-[0_0_0_4px_rgba(124,44,255,0.18)]"
              placeholder="Tell us what you want to build, improve, or automate."
            />
          </label>

          {message ? (
            <p
              className={[
                "mt-5 rounded-2xl border px-4 py-3 text-sm",
                formState === "success"
                  ? "border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-100"
                  : "border-red-600/20 bg-red-500/10 text-red-700 dark:border-red-300/20 dark:bg-red-300/10 dark:text-red-100",
              ].join(" ")}
              role="status"
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-purple-300/25 bg-purple-600 px-8 text-sm font-bold text-white shadow-[0_0_50px_rgba(124,44,255,0.35)] transition hover:-translate-y-1 hover:bg-purple-500 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
          >
            {formState === "submitting" ? "Sending..." : "Start the conversation"}
            <ArrowUpRight className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-theme-secondary">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="h-12 rounded-2xl border border-theme input-theme px-4 text-sm text-theme-primary outline-none transition focus:border-purple-300/60 focus:shadow-[0_0_0_4px_rgba(124,44,255,0.18)]"
      />
    </label>
  );
}
