import { JSONContent } from "../types/json-content.interface";

export function extractTextFromTiptap(node: JSONContent): string {
  let text = "";

  if (node.text) {
    text += node.text;
  }

  if (node.content && Array.isArray(node.content)) {
    text += node.content.map(extractTextFromTiptap).join(" ");
  }

  return text.trim().replace(/\s+/g, " ");
}
