import { baseUrl } from "../config"
import relToAbs from "rel-to-abs"

export default (html) => {
  return relToAbs.convert(html, baseUrl)
}
