import React, { Component, PropTypes } from "react"

import enhanceCollection from "statinamic/lib/enhance-collection"
import Helmet from "react-helmet"
import SidebarLayout from "../../components/SidebarLayout"
import PostEntry from "../../components/PostEntry"

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg: { config },
    } = this.context.metadata

    const pageLinks = enhanceCollection(this.context.collection, {
      filter: (t) => (t.layout === "Post"),
      sort: "date",
      reverse: true,
    }).map((post) => (
      <PostEntry key={ post.__url } post={ post } />
    ))

    return (
      <SidebarLayout>
        <Helmet title={ config.siteTitle } />
        { pageLinks }
      </SidebarLayout>
    )
  }
}
