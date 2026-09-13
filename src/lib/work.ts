// Dummy case studies — swap for real client work (with permission)
// once available. Metrics and client names below are illustrative only.
export type CaseStudy = {
  slug: string;
  client: string;
  category: "IT Services" | "Digital Marketing";
  title: string;
  summary: string;
  results: { label: string; value: string }[];
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northbridge-retail-cloud-migration",
    client: "Northbridge Retail Co.",
    category: "IT Services",
    title: "Zero-downtime cloud migration for a 40-store retail chain",
    summary:
      "Northbridge was running point-of-sale and inventory systems on aging on-premise servers with no disaster recovery plan. We migrated their entire stack to the cloud over a single off-hours weekend, with full rollback tested in advance.",
    results: [
      { label: "Migration downtime", value: "0 hours" },
      { label: "Infrastructure cost", value: "-32%" },
      { label: "Incident response time", value: "-65%" },
    ],
    tags: ["Cloud Migration", "Infrastructure", "Retail"],
  },
  {
    slug: "harlow-clinic-seo-relaunch",
    client: "Harlow Family Clinic",
    category: "Digital Marketing",
    title: "Rebuilding organic visibility after a botched site relaunch",
    summary:
      "A previous website redesign tanked Harlow's search rankings overnight. We ran a full technical SEO recovery, rebuilt their content strategy around patient search intent, and relaunched local SEO campaigns across three locations.",
    results: [
      { label: "Organic traffic", value: "+184%" },
      { label: "Local search ranking", value: "Top 3" },
      { label: "New patient inquiries", value: "+61%" },
    ],
    tags: ["SEO", "Local Search", "Healthcare"],
  },
  {
    slug: "vantree-logistics-paid-media",
    client: "Vantree Logistics",
    category: "Digital Marketing",
    title: "Cutting cost-per-lead in half with a rebuilt paid media funnel",
    summary:
      "Vantree was spending heavily on Google Ads with little visibility into what was actually converting. We rebuilt their tracking from scratch, restructured campaigns around high-intent keywords, and introduced conversion rate optimization on their landing pages.",
    results: [
      { label: "Cost per lead", value: "-52%" },
      { label: "Conversion rate", value: "+38%" },
      { label: "Monthly qualified leads", value: "3x" },
    ],
    tags: ["Paid Media", "PPC", "Logistics"],
  },
];
