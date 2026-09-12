import { NextResponse } from "next/server";

const allowedServices = new Set([
  "AI & Automation Solutions",
  "Custom Software Development",
  "Web & Mobile Application Development",
  "Cloud & DevOps",
  "AI Consulting",
  "Digital Transformation",
  "MVP Development",
  "Not sure yet",
]);

const allowedBudgets = new Set([
  "Under INR 80,000",
  "INR 80,000 - INR 2,00,000",
  "INR 2,00,000 - INR 6,00,000",
  "INR 6,00,000+",
  "To be discussed",
]);

const allowedTimelines = new Set([
  "Immediately",
  "2-4 weeks",
  "1-3 months",
  "3+ months",
  "To be discussed",
]);

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;

type ContactRequest = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  details?: string;
  message?: string;
  website?: string;
};

function sanitize(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor || realIp || "anonymous";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const record = rateLimitStore.get(clientKey);

  if (!record || record.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });

    return false;
  }

  if (record.count >= maxRequestsPerWindow) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);

    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        {
          status: 429,
        },
      );
    }

    const data = (await request.json()) as ContactRequest;

    if (sanitize(data.website, 120)) {
      return NextResponse.json({
        success: true,
        message: "Thanks. Your message has been received.",
      });
    }

    const payload = {
      name: sanitize(data.name, 120),
      email: sanitize(data.email, 180).toLowerCase(),
      company: sanitize(data.company, 160),
      phone: sanitize(data.phone, 40),
      service: sanitize(data.service, 80),
      budget: sanitize(data.budget, 80),
      timeline: sanitize(data.timeline, 80),
      details: sanitize(data.details || data.message, 1600),
    };

    if (
      payload.name.length < 2 ||
      !payload.email ||
      payload.phone.length < 7 ||
      !payload.service ||
      !payload.budget ||
      !payload.timeline ||
      payload.details.length < 20
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields with enough detail.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid work email.",
        },
        {
          status: 400,
        },
      );
    }

    if (!allowedServices.has(payload.service)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid service.",
        },
        {
          status: 400,
        },
      );
    }

    if (!allowedBudgets.has(payload.budget)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid budget.",
        },
        {
          status: 400,
        },
      );
    }

    if (!allowedTimelines.has(payload.timeline)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid timeline.",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks. Your message has been received.",
      integration: {
        resend: "ready",
        supabase: "ready",
        backend: "ready",
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit the form right now.",
      },
      {
        status: 500,
      },
    );
  }
}
