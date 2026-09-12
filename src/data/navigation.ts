import type { LucideIcon } from "lucide-react";
import { Mail } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationItem[];
};

export type FooterColumn = {
  title: string;
  links: NavigationItem[];
};

export type SocialLink = NavigationItem & {
  icon: LucideIcon;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/capabilities" },
  { label: "Process", href: "/process" },
  { label: "Technology", href: "/technology" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Alyvora",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/capabilities" },
      { label: "Process", href: "/process" },
      { label: "Technology", href: "/technology" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/contact" },
      { label: "Terms", href: "/contact" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "Email Alyvora", href: "mailto:hello@alyvora.ai", icon: Mail },
];
