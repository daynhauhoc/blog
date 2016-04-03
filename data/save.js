import { writeFile } from "fs-promise"
import { join } from "path"

const template = (meta, content) => (
`---json
${ JSON.stringify(meta)}
---

${ content }
`
)

export default async function saveToFile(
  fileData,
  distPath,
) {
  const { meta, content } = fileData
  const filePath = join(distPath, fileData.meta.id.toString() + ".md")
  const fileContent = template(meta, content)

  await writeFile(filePath, fileContent)
}
