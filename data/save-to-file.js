import { writeFile } from "fs-promise"
import { join } from "path"
import joinUri from "join-uri"
import toSimpleUnicode from "vietnamese-unicode-toolkit"

const template = (meta, content) => (
`---json
${ JSON.stringify(meta)}
---

${ content }
`
)

const getTopicOriginalPosterId = (post) => (
  post.posters
  .find(
    (poster) => poster.description.includes("Original Poster")
  )
  .user_id
)

export default async function saveToFile(
  post,
  distPath,
  usersCollection
) {
  const filePath = join(distPath, post.id.toString() + ".md")

  // Get original posters information
  const userId = getTopicOriginalPosterId(post)
  const user = usersCollection.by("id", userId)

  // if (!user) {
  //   console.log(userId)
  // }

  const meta = {
    id: post.id,
    layout: "Post",
    route: joinUri(post.slug),
    title: toSimpleUnicode(post.title),
    tags: post.tags,
    date: post.created_at,
    ...user && {
      author: {
        username: user.username,
        avatar: user.avatar_template,
      },
    },
  }

  const content = toSimpleUnicode(post.raw)
  
  const fileContent = template(meta, content)
  await writeFile(filePath, fileContent)
}
