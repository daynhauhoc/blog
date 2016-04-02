import visit from "unist-util-visit"
import joinUri from "join-uri"

// https://github.com/auth0/rel-to-abs/blob/48dcf4a56daba6b1014f6fb0d734ad866f0c9faf/index.js#L4-L9
const regex = /^(https?|file|ftps?|mailto|javascript|data:image\/[^;]{2,9};):/i
const convert = (baseUrl, currentUrl) => {
  if (!currentUrl || regex.test(currentUrl)) {
    return currentUrl
  }
  return joinUri(baseUrl, currentUrl)
}

const getTransformer = (baseUrl) => {
  const transformer = (ast) => {
    visit(ast, "image", (node) => {
      console.log(node)
      if (node.url) {
        node.url = convert(baseUrl, node.url)
      }
    })
  }

  return transformer
}

/**
 * Expose.
 */
export default function(remark, options = {}) {
  if (!options.baseUrl) {
    throw new Error("You muse define baseUrl")
  }

  return getTransformer(options.baseUrl)
}
