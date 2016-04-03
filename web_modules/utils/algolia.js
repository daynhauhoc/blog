/**
 * Init algolia client search
 */

import algoliasearch from "algoliasearch"
import { algolia } from "../../config"

export const client = algoliasearch(algolia.appId, algolia.searchKey)
export const indexName = algolia.indexName
