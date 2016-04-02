import url from "url"
import querystring from "querystring"

export default function parseQuery(uri) {
  const parsedUri = url.parse(uri)
  const query = parsedUri.query
  if (!query) {
    return null
  }
  return querystring.parse(query)
}
