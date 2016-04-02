import { writeFile } from "fs-promise"
import { join } from "path"
import joinUri from "join-uri"

const template = (meta, content) => (
`---json
${ JSON.stringify(meta)}
---

${ content }
`
)

export default async function saveToFile(
  post,
  distPath,
  // usersCollection
) {
  const filePath = join(distPath, post.id.toString() + ".md")
  const meta = {
    id: post.id,
    layout: "Post",
    route: joinUri(post.slug),
    title: post.title,
    tags: post.tags,
    date: post.created_at,
  }

  const fileContent = template(meta, post.raw)
  await writeFile(filePath, fileContent)
}
