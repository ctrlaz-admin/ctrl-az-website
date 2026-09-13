// Single source of truth for CTRL AZ's contact details — referenced by
// the Contact page, footer, and header CTA. Update here, not per-page.
export const CONTACT_EMAIL = "info@ctrlaz.com";

// Every message addressed to CONTACT_EMAIL — both the mailto: links
// below and the contact-form notification email in
// src/app/api/contact/route.ts — should also BCC this address.
export const CONTACT_EMAIL_BCC = "admin@ctrlaz.com";

// Stored in local (not international-prefixed with spaces) form for
// building tel:/wa.me links reliably.
export const CONTACT_PHONE_DISPLAY = "+91 88287 43651";
export const CONTACT_PHONE_E164 = "+918828743651";
export const CONTACT_WHATSAPP_NUMBER = "918828743651"; // wa.me wants no "+"

export const contactLinks = {
  // mailto: BCC is a standard query param — supported by every major
  // mail client (Gmail, Outlook, Apple Mail, etc).
  email: `mailto:${CONTACT_EMAIL}?bcc=${CONTACT_EMAIL_BCC}`,
  phone: `tel:${CONTACT_PHONE_E164}`,
  whatsapp: `https://wa.me/${CONTACT_WHATSAPP_NUMBER}`,
};
