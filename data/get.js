import dnh from "./api"
import access from "safe-access"
import parseQuery from "./utils/parse-query"

const log = require("debug")("dnh:get")

export const getAllPosts = ({ users, posts }) => (
  new Promise((resolve, reject) => {
    const getAllPosts = (query = {}) => {
      dnh.getPostFromCategory("share/writes", query)
      .then((response) => JSON.parse(response.body))
      .then((json) => {
        log(query)
        users.insert(json.users)
        posts.insert(json.topic_list.topics)
        return json
      })
      .then((json) => {
        const nextPage = access(json, "topic_list.more_topics_url")
        if (nextPage) {
          const nextQuery = parseQuery(nextPage)
          getAllPosts(nextQuery)
        }
        else {
          resolve()
        }
      })
      .catch((err) => {
        reject(err)
      })
    }
    getAllPosts()
  })
)

export const getAndUpdatePost = async function (post, collection) {
  if (post.cooked) {
    return
  }
  const json = await dnh.getPostsStream(post.id)
  const posts = json.post_stream.posts
  post.cooked = posts[0].cooked
  post.author = {
    name: posts[0].name,
    avatar: posts[0].avatar_template,
    username: posts[0].username,
  }
  collection.update(post)
  log("downloaded post " + post.id)
}
