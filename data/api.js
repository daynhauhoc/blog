import joinUri from "join-uri"
import got from "got"
import querystring from "querystring"

class API {
  constructor() {
    this.host = "http://daynhauhoc.com"
    this.category = "share/writes"
    this.hit = 0
  }

  /**
   * Get from host
   * @return {promise}
   */
  get = (url, ...args) => {
    if (typeof url === "string") {
      url = [ url ]
    }
    return got(joinUri(this.host, ...url), ...args)
    .then((response) => {
      // Increase API hit counting
      this.hit++
      return response
    })
  }
  /**
   * Get category from
   * @param {string} category category-slug
   * @return {promise}
   */
  getPostFromCategory = (category = this.category, query) => (
    this.get([
      "c",
      category,
      "l/latest.json",
      ...query && [ "?" + querystring.stringify(query) ],
    ])
  )

  /**
   * Get raw post markdown content
   * @param {number} id
   * @return {promise}
   */
  getRawPost = (id) => (
    this.get([ "raw", id.toString() ])
  )

  /**
   * Get posts stream from topic
   * @param {number} id Topic id
   * @return {promise}
   */
  getPostsStream = (id) => (
    this.get([ "t", id.toString() + ".json" ])
    .then((response) => JSON.parse(response.body))
  )
}

const singleton = new API()

export default singleton
