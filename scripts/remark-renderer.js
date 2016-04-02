import remark from "remark"
import slug from "remark-slug"
import autoLinkHeadings from "remark-autolink-headings"
import highlight from "remark-highlight.js"
import html from "remark-html"
import { baseUrl } from "../config"
import relToAbs from "rel-to-abs"

export default (text) => {
  const resultHtml = remark
    // https://github.com/wooorm/remark-slug
    .use(slug)

    // https://github.com/ben-eb/remark-autolink-headings
    .use(autoLinkHeadings, {
      attributes: {
        class: "statinamic-HeadingAnchor",
      },
      template: "#",
    })
    // https://github.com/wooorm/remark-html
    .use(html, { entities: "escape" })

    // https://github.com/ben-eb/remark-highlight.js
    .use(highlight)

    // render
    .process(text, {
      commonmark: false,
      pedantic: true,
      breaks: true,
      gfm: true,
    })

  return relToAbs.convert(resultHtml, baseUrl)
}
