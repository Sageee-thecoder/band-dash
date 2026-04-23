export function buildEmailDraft({ audience, purpose, tone }) {
  return `Hi ${audience},\n\nThis is a ${tone} message regarding ${purpose}.\nLet's connect and align on next steps.\n\nBest,\nRN x US Management`;
}
