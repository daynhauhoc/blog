import remark from "remark"
import slug from "remark-slug"
import emoji from "remark-gemoji-to-emoji"
import highlight from "remark-highlight.js"
import html from "remark-html"
import { baseUrl } from "../config"
import relToAbs from "rel-to-abs"

export default (text) => {
  const resultHtml = remark
    .use(slug)
    .use(emoji)
    .use(html, { entities: "escape" })
    .use(highlight)
    .process(text, {
      commonmark: false,
      pedantic: true,
      breaks: true,
      gfm: true,
    })

  return relToAbs.convert(resultHtml, baseUrl)
}
