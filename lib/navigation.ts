import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavigationItem[];
};

export type SocialLink = NavigationItem & {
  icon: LucideIcon;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Platform", href: "/#platform" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Resources", href: "/#resources" },
  { label: "Company", href: "/#company" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/#platform" },
      { label: "Security", href: "/#security" },
      { label: "Integrations", href: "/#integrations" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Enterprise AI", href: "/#enterprise-ai" },
      { label: "Automation", href: "/#automation" },
      { label: "Data Systems", href: "/#data-systems" },
      { label: "Cloud Operations", href: "/#cloud-operations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Careers", href: "/#careers" },
      { label: "Contact", href: "/#contact" },
      { label: "Legal", href: "/#legal" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "GitHub", href: "https://github.com", icon: Github },
];
