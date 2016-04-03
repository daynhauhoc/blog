import joinUri from "join-uri"
import toSimpleUnicode from "vietnamese-unicode-toolkit"
import stripAccentMarks from "./utils/stripAccentMarks"
import renderer from "./remark-renderer"
import description from "./utils/generate-description"

import _ from "lodash"

const normalizeTags = (tags = []) => {
  const a = tags.map((tag) =>
    stripAccentMarks(tag)
    .replace(/\-/g, "")
    .replace(/\s/g, "")
  )

  return _.uniq(a)
}

export default function process(post) {
  const content = renderer(toSimpleUnicode(post.cooked))

  const meta = {
    id: post.id,
    layout: "Post",
    route: joinUri(post.slug),
    title: toSimpleUnicode(post.title),
    tags: post.tags && normalizeTags(post.tags),
    date: post.created_at,
    views: post.views,
    likes: post.like_count,
    description: description(content),
    author: post.author,
  }

  return {
    meta,
    content,
  }
}
