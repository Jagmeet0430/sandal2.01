"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";

type FormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
};

const projectTypes = [
  "AI product engineering",
  "Cloud modernization",
  "Workflow automation",
  "Data platform",
  "Security and compliance",
  "Not sure yet",
];

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.company.trim()) {
    errors.company = "Enter your company name.";
  }

  if (!values.projectType) {
    errors.projectType = "Select a project type.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell us a little about the project.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Add at least 20 characters so we have useful context.";
  }

  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateField(field: keyof FormValues, value: string) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setIsSubmitted(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitting(true);

    // Mock submit handler only. This intentionally does not send data to an email provider or database.
    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    setValues(initialValues);
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr] lg:gap-12">
          <div className="rounded-2xl border border-brand-border bg-brand-elevated p-6 shadow-sm sm:p-8 lg:p-10">
            <SectionHeading
              id="contact-title"
              eyebrow="Contact"
              title="Tell us what you are ready to build next."
              description="Share a few details about your goals and we will help shape the right technical path. This form uses a mock submit handler for now."
              className="max-w-2xl"
            />

            <form className="mt-10 grid gap-5" noValidate onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-semibold text-brand-navy">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="mt-2 h-12 w-full rounded-brand border border-brand-border bg-white px-4 text-brand-navy shadow-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="mt-2 text-sm font-medium text-red-600">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-sm font-semibold text-brand-navy">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="mt-2 h-12 w-full rounded-brand border border-brand-border bg-white px-4 text-brand-navy shadow-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="mt-2 text-sm font-medium text-red-600">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-company" className="text-sm font-semibold text-brand-navy">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(event) => updateField("company", event.target.value)}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "contact-company-error" : undefined}
                    className="mt-2 h-12 w-full rounded-brand border border-brand-border bg-white px-4 text-brand-navy shadow-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                  />
                  {errors.company ? (
                    <p id="contact-company-error" className="mt-2 text-sm font-medium text-red-600">
                      {errors.company}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-project-type" className="text-sm font-semibold text-brand-navy">
                    Project type
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    value={values.projectType}
                    onChange={(event) => updateField("projectType", event.target.value)}
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? "contact-project-type-error" : undefined}
                    className="mt-2 h-12 w-full rounded-brand border border-brand-border bg-white px-4 text-brand-navy shadow-sm outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((projectType) => (
                      <option key={projectType} value={projectType}>
                        {projectType}
                      </option>
                    ))}
                  </select>
                  {errors.projectType ? (
                    <p id="contact-project-type-error" className="mt-2 text-sm font-medium text-red-600">
                      {errors.projectType}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm font-semibold text-brand-navy">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
                  className="mt-2 w-full resize-y rounded-brand border border-brand-border bg-white px-4 py-3 text-brand-navy shadow-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-2 text-sm font-medium text-red-600">
                    {errors.message}
                  </p>
                ) : (
                  <p id="contact-message-hint" className="mt-2 text-sm text-brand-muted">
                    Include goals, timeline, or systems involved.
                  </p>
                )}
              </div>

              {hasErrors ? (
                <div className="rounded-brand border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  Please fix the highlighted fields before submitting.
                </div>
              ) : null}

              {isSubmitted ? (
                <div
                  className="flex items-start gap-3 rounded-brand border border-brand-primary/20 bg-brand-sky/50 px-4 py-3 text-sm font-medium text-brand-navy"
                  role="status"
                >
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-primary" />
                  Thanks. Your message was accepted by the mock handler.
                </div>
              ) : null}

              <Button type="submit" size="lg" className="w-full sm:w-fit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          </div>

          <aside
            aria-labelledby="contact-info-title"
            className="rounded-2xl border border-brand-border bg-brand-navy p-6 text-white shadow-soft sm:p-8 lg:p-10"
          >
            <h3 id="contact-info-title" className="text-2xl font-semibold">
              Contact information
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Share your project context and we will follow up with practical next steps. For now, use this panel as
              static contact information while integrations are not connected.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-brand bg-white/10 text-brand-sky">
                  <Mail aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <a className="mt-1 block text-sm text-white/70 transition hover:text-white" href="mailto:hello@example.com">
                    hello@example.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-brand bg-white/10 text-brand-sky">
                  <Phone aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <a className="mt-1 block text-sm text-white/70 transition hover:text-white" href="tel:+15550143029">
                    +1 555 014 3029
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-brand bg-white/10 text-brand-sky">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Location</p>
                  <p className="mt-1 text-sm text-white/70">Remote-first, serving enterprise teams globally</p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold">Typical response</p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Within one business day with a concise recommendation on discovery, scope, and next steps.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
