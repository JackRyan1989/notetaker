import { marked } from "marked";
import DOMPurify from "dompurify";

export default function sanitizeMarkdown(dirty) {
    marked.use({
        mangle: false,
        headerIds: false
      });
    const clean = DOMPurify.sanitize(marked.parse(dirty));
    return clean;
};
