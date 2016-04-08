import loki from "lokijs"

let database

/**
 * Get or add new collection from db
 */
const getOrAddCollection = (db, name) => {
  const list = db.listCollections()
  const collec = list.filter((item) => item.name === name)

  return (collec.length > 0)
  ? db.getCollection(name)
  : db.addCollection(name, {
    unique: [ "id" ],
  })
}

const getDbCollections = (db) => {
  return {
    db,
    posts: getOrAddCollection(db, "posts"),
    // users: getOrAddCollection(db, "users"),
  }
}

export default function createConnection(cb) {
  if (database) {
    cb(getDbCollections(database))
  }
  else {
    database = new loki("data.json", {
      autosave: true,
      autoload: true,
      autoloadCallback: () => cb(getDbCollections(database)),
    })
  }
}

export const async = () => (
  new Promise((resolve) => {
    createConnection((result) => resolve(result))
  })
)
