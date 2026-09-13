// Dummy/placeholder service content — swap copy once real service
// packages, pricing, and process details are finalized.
export type Service = {
  title: string;
  description: string;
};

export type ServiceGroup = {
  title: string;
  slug: string;
  tagline: string;
  blurb: string;
  heroDescription: string;
  services: Service[];
  process: { step: string; title: string; desc: string }[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "IT Services",
    slug: "it-services",
    tagline: "Infrastructure that stays out of your way",
    blurb:
      "Reliable infrastructure and engineering so your business runs without interruption.",
    heroDescription:
      "From day-to-day IT support to cloud migration and cybersecurity, we keep your systems running so your team can focus on the work that matters.",
    services: [
      {
        title: "Managed IT Support",
        description:
          "24/7 helpdesk, device management, and proactive monitoring so issues get fixed before they become downtime.",
      },
      {
        title: "Cloud Infrastructure & Migration",
        description:
          "Move to AWS, Azure, or Google Cloud with a migration plan that minimizes risk and downtime, plus ongoing cost optimization.",
      },
      {
        title: "Cybersecurity & Compliance",
        description:
          "Endpoint protection, network security, and compliance support (SOC 2, ISO 27001, HIPAA) tailored to your industry.",
      },
      {
        title: "Custom Software & Web Development",
        description:
          "Web apps, internal tools, and integrations built around how your business actually operates, not a generic template.",
      },
      {
        title: "IT Consulting & Strategy",
        description:
          "A technology roadmap aligned to your business goals, budget, and growth plans — reviewed quarterly.",
      },
    ],
    process: [
      { step: "01", title: "Audit", desc: "We assess your current systems, risks, and bottlenecks." },
      { step: "02", title: "Roadmap", desc: "We design an IT plan tailored to your budget and goals." },
      { step: "03", title: "Implement", desc: "We deploy, migrate, and configure with minimal disruption." },
      { step: "04", title: "Support", desc: "Ongoing monitoring, maintenance, and a real team on call." },
    ],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    tagline: "Marketing that's measured, not guessed",
    blurb:
      "Data-driven marketing that turns visibility into pipeline and revenue.",
    heroDescription:
      "We build and run marketing programs that are tracked end to end, so every dollar spent has a number attached to it.",
    services: [
      {
        title: "Search Engine Optimization (SEO)",
        description:
          "Technical SEO, content strategy, and link building to grow organic traffic that actually converts.",
      },
      {
        title: "Paid Media & PPC",
        description:
          "Google Ads, Meta, and LinkedIn campaigns managed for return on ad spend, not just impressions.",
      },
      {
        title: "Social Media Management",
        description:
          "Content calendars, community management, and paid social that build brand presence consistently.",
      },
      {
        title: "Content & Branding",
        description:
          "Website copy, blog content, and brand identity that make your business memorable and credible.",
      },
      {
        title: "Marketing Analytics & CRO",
        description:
          "Dashboards, attribution tracking, and conversion rate optimization so you know what's actually working.",
      },
    ],
    process: [
      { step: "01", title: "Research", desc: "We study your audience, competitors, and current performance." },
      { step: "02", title: "Strategy", desc: "We build a channel plan tied to specific, measurable goals." },
      { step: "03", title: "Launch", desc: "Campaigns and content go live, tracked from day one." },
      { step: "04", title: "Optimize", desc: "Monthly reporting and iteration based on real data." },
    ],
  },
];

export function getServiceGroup(slug: string) {
  return serviceGroups.find((group) => group.slug === slug);
}
