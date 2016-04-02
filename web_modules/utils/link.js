import joinUri from "join-uri"

const baseUrl = "http://daynhauhoc.com/"

export const postIdToUrl = (id) => joinUri(baseUrl, "t", id.toString())
