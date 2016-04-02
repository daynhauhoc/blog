export const baseUrl = "//daynhauhoc.com"
export const baseUrlHttp = "http://daynhauhoc.com"

export const condition = {
  "$and": [
    { like_count: { "$gte" : 10 } },
    { pinned: false },
  ],
}
