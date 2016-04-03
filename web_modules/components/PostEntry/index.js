import React, { PropTypes } from "react"
import Link from "statinamic/lib/Link"
import Time from "../Time"
import styles from "./styles.css"

const PostEntry = ({ post }) => ((
  <div className={ styles.postEntry }>
    <Time
      format="MMMM YYYY"
      time={ post.date }
      className={ styles.time }
    />
    <span style={ { padding: "5px" } } />
    {
      post.tags && post.tags.map((tag) => (
        <span key={ tag } className={ styles.tag }>{ tag }</span>
      ))
    }
    <h2>
      <Link
        style={ { borderBottom: "none" } }
        to={ post.__url }
      >
        <span dangerouslySetInnerHTML={ { __html: post.title } } />
      </Link>
    </h2>
    <p dangerouslySetInnerHTML={ { __html: post.description } } />
    <Link
      className={ styles.readmore }
      to={ post.__url }
    >
      { "Read" }
    </Link>
  </div>
))

PostEntry.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostEntry
