import _s from "underscore.string"

const options = {
  stripTags: true,
  pruneLength: 140,
  pruneString: "…",
}
/**
 * retrieve excerpt from file object by extracting the first p's contents
 *
 * @param  {Object} file file object
 * @return {mixed}       excerpt string or false
 */

export default function excerpt(html) {
  let excerpt = _s.stripTags(html)
  if (options.pruneLength > 0) {
    excerpt = _s.prune(excerpt, options.pruneLength, options.pruneString)
  }
  return excerpt
}
