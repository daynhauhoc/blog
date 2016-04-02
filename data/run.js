import { join } from "path"
import fsp from "fs-promise"
import getAllPosts from "./get-all-posts"
import { async as database } from "./db"
import dnh from "./api"
import { filter } from "./config"
import saveToFile from "./save-to-file"

const log = require("debug")("dnh:run")
const logStats = require("debug")("dnh:stats")

const getAndUpdateRawPost = async function (post, collection) {
  if (!post.raw) {
    const response = await dnh.getRawPost(post.id)
    post.raw = response.body
    collection.update(post)
    log("downloaded post " + post.id)
  }
}

export default async function () {
  // TODO: Is it safe to do this ?
  const { db, users, posts } = await database()
  try {
    if (!posts.data.length) {
      await getAllPosts({ users, posts })
    }

    const data = posts.find(filter)
    logStats(data.length + " posts passed condition")

    await Promise.all(
      Object
      .keys(data)
      .map((key) => getAndUpdateRawPost(data[key], posts))
    )

    const contentDir = join(__dirname, "../content")
    await fsp.ensureDir(contentDir)
    await fsp.emptyDir(contentDir)
    log("Created content folder")

    await fsp.copy(
      join(__dirname, "../content-holder"),
      contentDir
    )
    log("Copied content from content-holder/ to content/")

    await Promise.all(
      Object
      .keys(data)
      .map((key) => saveToFile(data[key], contentDir))
    )
    log("Saved posts to markdown files")

    logStats("Hit DNH API: " + dnh.hit)
  }
  catch (err) {
    log(err)
    throw err
  }

  db.save()
  db.close()
}
