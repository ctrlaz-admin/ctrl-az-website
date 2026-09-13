export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  readTimeMinutes: number;
  category: string;
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-increase-your-business-digital-presence",
    title: "How to Increase Your Business's Digital Presence in 2026",
    excerpt:
      "A practical, no-fluff breakdown of what actually moves the needle on digital presence: your website, search visibility, content, social proof, and the tracking that tells you what's working.",
    author: "CTRL AZ Team",
    date: "2026-09-13",
    readTimeMinutes: 7,
    category: "Digital Marketing",
    content: [
      {
        type: "p",
        text: "\"Digital presence\" gets thrown around a lot, and it's easy to treat it as a vague goal instead of a set of specific, measurable things. In reality, your digital presence is just the sum of everywhere a potential customer can find, evaluate, and interact with your business online — your website, search results, social profiles, reviews, and the content you put out. Improve enough of those pieces and the effect compounds: more visibility leads to more trust, which leads to more conversions.",
      },
      {
        type: "p",
        text: "Below is the order we actually work through with clients, starting with the foundation and moving outward. Skipping ahead to social media or ads before the foundation is solid is one of the most common reasons digital marketing spend underperforms.",
      },
      {
        type: "h2",
        text: "1. Start with a website that can actually convert",
      },
      {
        type: "p",
        text: "Every other channel — SEO, ads, social, email — eventually sends people back to your website. If it's slow, confusing, or doesn't work on mobile, you're paying to send traffic to a leaky bucket.",
      },
      {
        type: "ul",
        items: [
          "Page speed: aim for under 2.5 seconds to load on mobile. Every extra second of load time measurably increases the number of visitors who leave before the page finishes loading.",
          "Mobile-first: more than half of web traffic for most businesses now comes from phones. Test your actual site on an actual phone, not just a resized browser window.",
          "Clear calls to action: every important page should make it obvious what you want the visitor to do next — call, book, buy, or fill out a form. One primary action per page, not five competing ones.",
          "Trust signals: reviews, client logos, certifications, and real contact information near the top of the page, not buried in the footer.",
        ],
      },
      {
        type: "h2",
        text: "2. Make sure you can be found in search",
      },
      {
        type: "p",
        text: "Search engine optimization is a long game, but it compounds — unlike ads, organic rankings don't disappear the moment you stop paying. The core of SEO is simpler than most people expect:",
      },
      {
        type: "ul",
        items: [
          "Technical SEO: your site needs to be crawlable, fast, secure (HTTPS), and free of broken links and duplicate content. This is the unglamorous work that everything else depends on.",
          "Search intent: write content that answers the actual question someone is typing into Google, not just content stuffed with keywords. Intent match matters more than keyword density.",
          "Local SEO: if you serve a specific area, claim and fully fill out your Google Business Profile, keep your name/address/phone number consistent everywhere online, and actively collect reviews.",
          "Backlinks: other reputable sites linking to yours is still one of the strongest ranking signals. Earn these through genuinely useful content, partnerships, and press — not link farms, which can get you penalized.",
        ],
      },
      {
        type: "h2",
        text: "3. Publish content that does more than fill a calendar",
      },
      {
        type: "p",
        text: "Content marketing works when it's built around real questions your customers ask, not a generic \"5 tips\" post written to hit a publishing quota. Before writing anything, ask: would a real prospective customer actually search for this, and does this page genuinely answer it better than what's already ranking?",
      },
      {
        type: "p",
        text: "A blog post, a short explainer video, and a well-structured FAQ page can all outperform a expensively produced piece of content that doesn't map to what people are actually searching for.",
      },
      {
        type: "h2",
        text: "4. Be consistent on the platforms your customers actually use",
      },
      {
        type: "p",
        text: "You don't need to be everywhere. Pick the one or two platforms where your actual customers spend time, and post consistently there rather than spreading thin across five platforms with sporadic activity. A LinkedIn presence matters far more for B2B services than TikTok; the reverse is often true for consumer retail brands.",
      },
      {
        type: "h2",
        text: "5. Use paid media to accelerate, not replace, the rest",
      },
      {
        type: "p",
        text: "Paid search and social ads are the fastest way to get in front of people — but they're most effective as an amplifier on top of a solid website and clear messaging, not a substitute for them. Sending paid traffic to a weak landing page is one of the most common ways businesses waste ad spend.",
      },
      {
        type: "ul",
        items: [
          "Set up conversion tracking before you spend a single dollar — otherwise you're optimizing blind.",
          "Start narrow. A tightly targeted campaign that converts well will teach you more than a broad one that doesn't.",
          "Test landing pages, not just ad creative. Small changes to a headline or form length often move conversion rate more than a new ad graphic.",
        ],
      },
      {
        type: "h2",
        text: "6. Measure what actually matters",
      },
      {
        type: "p",
        text: "Impressions and follower counts feel good but rarely pay the bills. The metrics worth tracking closely are the ones tied to revenue: qualified leads, cost per lead, conversion rate, and customer acquisition cost. Set up analytics and attribution before you scale spend on any channel, not after.",
      },
      {
        type: "quote",
        text: "If a metric can't be traced back to a lead or a sale, treat it as a signal, not a scoreboard.",
      },
      {
        type: "h2",
        text: "Putting it together",
      },
      {
        type: "p",
        text: "Digital presence isn't one project you finish — it's an ongoing system: a fast, trustworthy website, visibility in search, content that answers real questions, a consistent presence where your customers already are, and tracking that tells you what's actually working. Get the foundation right first, and everything you do on top of it works harder.",
      },
      {
        type: "p",
        text: "If you'd like a second set of eyes on where your digital presence stands today, that's exactly the kind of audit we do for clients before recommending anything — get in touch and we'll walk you through it.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
