import "server-only";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/**
 * Render trusted-but-stored markdown (blog bodies authored in the admin CRM)
 * to a sanitized HTML string. Even though the author is the authenticated
 * site owner, the content round-trips through the database, so we sanitize the
 * output to a safe tag/attribute allowlist as defense-in-depth against XSS.
 */
export async function renderMarkdown(md: string): Promise<string> {
  const rawHtml = await marked.parse(md || "", { async: true });
  return sanitizeHtml(rawHtml, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "a", "ul", "ol", "li", "blockquote",
      "strong", "em", "del", "code", "pre", "hr", "br",
      "table", "thead", "tbody", "tr", "th", "td", "img",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["https"], a: ["http", "https", "mailto"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}
