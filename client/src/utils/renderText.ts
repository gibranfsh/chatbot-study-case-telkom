import { marked } from "marked";

export function renderText(content: string) {
  let html = marked(content);
  if (typeof html === "string") {
    html = html.replace(/\n/g, "<br/>");
  }
  return { __html: html };
}
