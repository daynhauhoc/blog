import React, { Component, PropTypes } from "react"
import PostEntry from "../PostEntry"
import styles from "./styles.css"
import AlgoliaLogo from "./algolia.svg"
import SVG from "react-svg-inline"

export default class SearchResult extends Component {
  static propTypes = {
    hits: PropTypes.array.isRequired,
  };

  render() {
    const hits = this.props.hits

    return (
      <div>
        <h1 className={ styles.title }>Kết quả tìm kiếm</h1>
        {
          hits.length <= 0 &&
          <span>Không có kết quả nào. Hãy thử tìm với từ khóa khác</span>
        }
        {
          hits.length > 0 &&
          this.props.hits.map((post, key) => {
            const data = {
              ...post,
              title: post._highlightResult.title.value,
              description: post._highlightResult.content.value,
              __url: `/${ post.route}/`,
            }

            return (
              <PostEntry
                key={ key }
                post={ data }
              />
            )
          })
        }
        <p className={ styles.algolia }><SVG svg={ AlgoliaLogo } /></p>
      </div>
    )
  }
}
