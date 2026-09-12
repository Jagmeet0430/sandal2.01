"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquareText,
} from "lucide-react";

const inputClassName =
  "h-14 w-full rounded-xl border border-theme input-theme px-4 text-sm outline-none transition focus:border-violet-300/70 focus:ring-4 focus:ring-violet-500/20";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send enquiry.");
      }

      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send enquiry.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="cinematic-glass rounded-[32px] p-6 text-theme-primary sm:p-8 lg:p-10">
      <div className="flex items-center gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-violet-400/10 text-violet-200">
          <MessageSquareText className="size-5" />
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
            Project enquiry
          </p>

          <h3 className="mt-1 text-2xl font-extrabold">Tell us about your project</h3>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-theme-secondary">
        Share a few details about your goals, current challenges, and the solution you are considering.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-6">
          <CheckCircle2 className="size-9 text-emerald-300" />

          <h4 className="mt-4 text-xl font-extrabold">Thank you for contacting us</h4>

          <p className="mt-2 text-sm leading-7 text-theme-secondary">
            Your enquiry has been recorded. Connect this form to your email, API, or database before deploying the
            website.
          </p>

          <button type="button" onClick={() => setSubmitted(false)} className="mt-5 text-sm font-bold text-violet-700 hover:text-violet-950 dark:text-blue-200 dark:hover:text-white">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-bold text-theme-secondary">
                First name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                placeholder="First name"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-bold text-theme-secondary">
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                placeholder="Last name"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-theme-secondary">
                Work email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-bold text-theme-secondary">
                Phone number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="service" className="mb-2 block text-sm font-bold text-theme-secondary">
              Service required
            </label>

            <select id="service" name="service" required defaultValue="" className={inputClassName}>
              <option value="" disabled>
                Select a service
              </option>
              <option value="ai-development">AI application development</option>
              <option value="web-development">Web application development</option>
              <option value="cloud">Cloud and DevOps</option>
              <option value="data">Data engineering</option>
              <option value="design">UI and UX design</option>
              <option value="automation">Intelligent automation</option>
            </select>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-2 block text-sm font-bold text-theme-secondary">
              Project details
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Describe what you want to build or improve..."
              className="min-h-[150px] w-full resize-y rounded-xl border border-theme input-theme p-4 text-sm outline-none transition focus:border-violet-300/70 focus:ring-4 focus:ring-violet-500/20"
            />
          </div>

          {error ? (
            <p className="mt-5 rounded-xl border border-red-600/20 bg-red-500/10 p-4 text-sm text-red-700 dark:border-red-300/20 dark:bg-red-400/10 dark:text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-violet-500 to-violet-800 px-7 text-sm font-extrabold text-white shadow-[0_18px_48px_rgba(138,43,255,0.36)] transition hover:-translate-y-0.5 hover:from-violet-400 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send project enquiry"}
            {!submitting ? <ArrowRight className="size-5" /> : null}
          </button>

          <div className="mt-5 flex items-start gap-3 text-xs leading-6 text-theme-muted">
            <Mail className="mt-1 size-4 shrink-0" />

            <p>
              You can also contact us directly at{" "}
              <a href="mailto:hello@alyvora.ai" className="font-bold text-violet-700 hover:text-violet-950 dark:text-blue-200 dark:hover:text-white">
                hello@alyvora.ai
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
