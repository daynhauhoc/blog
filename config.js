export const baseUrl = "http://daynhauhoc.com"
export const baseUrlHttp = "http://daynhauhoc.com"

export const condition = {
  "$and": [
    { like_count: { "$gte" : 10 } },
    { pinned: false },
  ],
}

export const algolia = {
  appId: "GQCS86ZYQX",
  indexName: "dnh-posts",
  searchKey: "b952957ee76d25524f9a31bf5a108313",
}
