export const baseUrl = "http://daynhauhoc.com"
export const baseUrlHttp = "http://daynhauhoc.com"

export const condition = {
  "$and": [
    {
      "$or": [
        { like_count: { "$gte" : 10 } },
        { reply_count: { "$gte": 5 } },
      ],
    },
    { pinned: false },
  ],
}

export const algolia = {
  appId: "GQCS86ZYQX",
  indexName: "dnh-posts",
  searchKey: "b952957ee76d25524f9a31bf5a108313",
}
