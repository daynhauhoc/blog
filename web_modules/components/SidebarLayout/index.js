import React, { Component, PropTypes } from "react"
import SidebarLeft from "../SidebarLeft"
import styles from "./styles.css"
import { client as algoliaClient, indexName } from "../../utils/algolia"
import AlgoliaInput from "algolia-react-input"
import SearchResult from "../SearchResult"

export default class SidebarLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props)

    this.state = {
      hits: undefined,
    }
  }

  onError = () => {
    console.log("onError", arguments)
  }
  onResults = (content) => {
    this.setState({ hits: content.hits })
  }

  onEmptyField = () => {
    this.setState({ hits: undefined })
  }

  render() {
    const SearchInput = (
      <AlgoliaInput
        placeholder="Tìm kiếm..."
        className={ styles.searchInput }
        client={ algoliaClient }
        index={ indexName }
        onResults={ this.onResults }
        onEmptyField={ this.onEmptyField }
        onError={ this.onError }
      />
    )

    const hits = this.state.hits

    return (
      <div>
        <SidebarLeft searchInput={ SearchInput } />
        <div className={ styles.wrapper }>
          <main className={ styles.inner }>
            {
              typeof hits !== "undefined" &&
              <SearchResult hits={ hits } />
            }
            {
              typeof hits === "undefined" &&
              this.props.children
            }
          </main>
        </div>
      </div>
    )
  }
}
