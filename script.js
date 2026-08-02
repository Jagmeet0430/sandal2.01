const body = document.body;
const loader = document.querySelector(".loader");
const cursorGlow = document.querySelector(".cursor-glow");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");
const themeToggle = document.querySelector(".theme-toggle");
const searchButtons = document.querySelectorAll(".icon-btn[aria-label='Search']");
const revealItems = document.querySelectorAll("[data-reveal]");
const counters = document.querySelectorAll("[data-counter]");
const filterButtons = document.querySelectorAll("[data-filter]");
const workCards = document.querySelectorAll(".work-card");
const modal = document.querySelector("#caseModal");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const contactForm = document.querySelector(".contact-form");
const newsletter = document.querySelector(".newsletter");
const searchIndex = [
  ["Services", "index.html#services"],
  ["Artificial Intelligence", "services.html#artificial-intelligence"],
  ["Healthcare AI", "services.html#healthcare-ai"],
  ["Dental AI", "services.html#dental-ai"],
  ["Portfolio", "index.html#portfolio"],
  ["Case Studies", "index.html#case-studies"],
  ["Technology Stack", "index.html#stack"],
  ["Industries", "index.html#industries"],
  ["Admin Dashboard", "admin.html#dashboard"],
  ["Contact", "index.html#contact"],
];

const caseStudies = {
  agentops: {
    title: "AgentOps Command Center",
    summary:
      "A governed AI support platform with RAG, audit trails, human approvals, analytics, and workflow automation.",
    metrics: ["36% lower operating cost", "4.8x faster response", "99.9% platform uptime"],
  },
  patient: {
    title: "Patient Intelligence Platform",
    summary:
      "A healthcare AI workspace that unifies intake, insurance tasks, routing, and leadership reporting.",
    metrics: ["41% faster intake", "28% fewer escalations", "14 week launch"],
  },
  dental: {
    title: "Dental Imaging Copilot",
    summary:
      "A clinician-controlled imaging and charting assistant for multi-location dental organizations.",
    metrics: ["31% review reduction", "2.1x charting speed", "HIPAA-aware workflows"],
  },
  fintech: {
    title: "Risk Signal Engine",
    summary:
      "Real-time anomaly detection and compliance intelligence for transaction monitoring teams.",
    metrics: ["67% faster review", "22 integrations", "SOC2-ready audit logs"],
  },
};

window.addEventListener("load", () => {
  setTimeout(() => loader?.classList.add("hidden"), 420);
});

document.addEventListener("pointermove", (event) => {
  cursorGlow?.style.setProperty("--x", `${event.clientX}px`);
  cursorGlow?.style.setProperty("--y", `${event.clientY}px`);
});

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu?.classList.toggle("open");
  navActions?.classList.toggle("open");
});

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark");
});

function openSearch() {
  const existing = document.querySelector(".search-popover");
  if (existing) existing.remove();

  const dialog = document.createElement("dialog");
  dialog.className = "search-popover";
  dialog.innerHTML = `
    <button class="modal-close" type="button" aria-label="Close search">&times;</button>
    <label>
      Search
      <input type="search" placeholder="AI, healthcare, portfolio" autofocus />
    </label>
    <div class="search-results"></div>
  `;

  const results = dialog.querySelector(".search-results");
  const input = dialog.querySelector("input");
  const render = (query = "") => {
    const normalized = query.trim().toLowerCase();
    const matches = searchIndex.filter(([label]) => !normalized || label.toLowerCase().includes(normalized));
    results.innerHTML = matches
      .map(([label, href]) => `<a href="${href}">${label}<span>Open</span></a>`)
      .join("");
  };

  document.body.appendChild(dialog);
  render();
  dialog.showModal();
  input?.focus();
  input?.addEventListener("input", () => render(input.value));
  dialog.querySelector(".modal-close")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => dialog.remove());
}

searchButtons.forEach((button) => {
  button.addEventListener("click", openSearch);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
  revealObserver.observe(item);
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.counter || 0);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 44));
      const tick = () => {
        current = Math.min(target, current + step);
        entry.target.textContent = `${current}${target === 98 ? "%" : "+"}`;
        if (current < target) requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => counterObserver.observe(counter));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const selected = button.dataset.filter;
    workCards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.style.display = shouldShow ? "" : "none";
    });
  });
});

workCards.forEach((card) => {
  card.addEventListener("click", () => {
    const study = caseStudies[card.dataset.modal];
    if (!study || !modal || !modalContent) return;
    modalContent.innerHTML = `
      <span class="section-kicker">Case Study</span>
      <h3>${study.title}</h3>
      <p>${study.summary}</p>
      <dl>
        ${study.metrics.map((metric, index) => `<div><dt>Metric ${index + 1}</dt><dd>${metric}</dd></div>`).join("")}
      </dl>
    `;
    modal.showModal();
  });
});

modalClose?.addEventListener("click", () => modal?.close());

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = contactForm.querySelector(".form-note");
  if (note) note.textContent = "Thanks. Your consultation request has been prepared.";
  contactForm.reset();
});

newsletter?.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletter.reset();
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.16}px)`;
  });
  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

document.querySelectorAll("button, .primary-btn, .secondary-btn").forEach((control) => {
  control.addEventListener("click", (event) => {
    const rect = control.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    control.appendChild(ripple);
    setTimeout(() => ripple.remove(), 520);
  });
});

const canvas = document.querySelector("#field");
const context = canvas?.getContext("2d");
const particles = Array.from({ length: 90 }, () => ({
  x: Math.random(),
  y: Math.random(),
  vx: (Math.random() - 0.5) * 0.00055,
  vy: (Math.random() - 0.5) * 0.00055,
  r: 1 + Math.random() * 2,
}));

function resizeCanvas() {
  if (!canvas || !context) return;
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function drawParticles() {
  if (!canvas || !context) return;
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
    if (particle.y < 0 || particle.y > 1) particle.vy *= -1;

    const x = particle.x * window.innerWidth;
    const y = particle.y * window.innerHeight;
    context.beginPath();
    context.arc(x, y, particle.r, 0, Math.PI * 2);
    context.fillStyle = "rgba(13, 110, 253, 0.25)";
    context.fill();

    for (let j = index + 1; j < particles.length; j += 1) {
      const other = particles[j];
      const ox = other.x * window.innerWidth;
      const oy = other.y * window.innerHeight;
      const distance = Math.hypot(x - ox, y - oy);
      if (distance < 105) {
        context.strokeStyle = `rgba(20, 184, 212, ${0.13 - distance / 900})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(ox, oy);
        context.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
drawParticles();
window.addEventListener("resize", resizeCanvas);
