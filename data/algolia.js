import algoliasearch from "algoliasearch"
import { algolia } from "../config"
import cheerio from "cheerio"

const log = require("debug")("dnh:agolia")
const { appId, indexName } = algolia
const adminKey = process.env.ALGOLIA_ADMIN_KEY

const breakHTMLIntoNodes = (html) => {
  const $ = cheerio.load(html)
  const result = []

  /*
   * Break <p>foo<br>bar</p> into
   * <p>foo</p><p>bar</p>
   */
  $("p").each((i, elem) => {
    const content = $(elem).html()
    const count = (content.match(/<br>/g) || []).length
    for (let i = 0; i < count; i++) {
      $(elem).html(content.replace("br", "p"))
    }
  })

  $("p").each((i, elem) => {
    result.push({
      tag_name: "p",
      selector: i + 1,
      content: $(elem).text(),
    })
  })

  return result
}
export default async function sendToAlgolia(posts) {

  const data = posts.map(({ content, meta }) => {
    const nodes = breakHTMLIntoNodes(content)
    const baseObject = {
      ...meta,
    }

    return nodes.map((node) => ({
      objectID: `${ baseObject.id }_${ node.tag_name }_${ node.selector }`,
      ...baseObject,
      ...node,
    }))
  })
  // Flatten array
  .reduce((result, node) => result.concat(node), [])

  const client = algoliasearch(appId, adminKey)
  const index = client.initIndex(indexName)
  index.saveObjects(data)
  .then(() => {
    log("Sent data to Agolia")
  })
  .catch((error) => {
    log(error)
    log("Error while sending data to Agolia")
  })
}
