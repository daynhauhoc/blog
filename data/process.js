import joinUri from "join-uri"
import toSimpleUnicode from "vietnamese-unicode-toolkit"
import stripAccentMarks from "./utils/stripAccentMarks"
import renderer from "./remark-renderer"

import _ from "lodash"

const getTopicOriginalPosterId = (post) => (
  post.posters
  .find(
    (poster) => poster.description.includes("Original Poster")
  )
  .user_id
)

const normalizeTags = (tags = []) => {
  const a = tags.map((tag) =>
    stripAccentMarks(tag)
    .replace(/\-/g, "")
    .replace(/\s/g, "")
  )

  return _.uniq(a)
}

export default function process(
  post,
  usersCollection
) {
  // Get original posters information
  const userId = getTopicOriginalPosterId(post)
  const user = usersCollection.by("id", userId)

  // TODO: Why is this situtaion ?
  // if (!user) {
  //   console.log(userId)
  // }

  const meta = {
    id: post.id,
    layout: "Post",
    route: joinUri(post.slug),
    title: toSimpleUnicode(post.title),
    tags: post.tags && normalizeTags(post.tags),
    date: post.created_at,
    views: post.views,
    likes: post.like_count,
    ...user && {
      author: {
        username: user.username,
        avatar: user.avatar_template,
      },
    },
  }

  const content = renderer(toSimpleUnicode(post.raw))

  return {
    meta,
    content,
  }
}
