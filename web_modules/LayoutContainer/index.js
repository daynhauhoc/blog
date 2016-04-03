/* eslint-disable max-len */
import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"

import "./global/global.styles"
import styles from "./styles.css"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg: { config },
    } = this.context.metadata

    return (
      <div>
        <Helmet
          link={ [
            {
              rel: "stylesheet",
              href: "https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400italic,700,700italic|Open+Sans:300|Roboto+Slab:400,300&subset=latin,vietnamese",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "144x144",
              href: "//daynhauhoc.s3.amazonaws.com/36ee34de6c73f268424fceaef858c5428d8fb2a976.ico",
            },
            {
              rel: "icon",
              type: "image/png",
              href: "//daynhauhoc.s3.amazonaws.com/352ac0c01c6e4e15be7ee46da53668513fd4e93736.png",
            },
            {
              rel: "apple-touch-icon",
              type: "image/png",
              href: "//daynhauhoc.s3.amazonaws.com/352ac0c01c6e4e15be7ee46da53668513fd4e93736.png",
            },
          ] }
          meta={ [
            { property: "og:site_name", content: config.siteTitle },
            { name: "twitter:site", content: `@${  config.twitter }` },
          ] }
        />
        <div className={ styles.wrapper }>
          { this.props.children }
        </div>
      </div>
    )
  }
}
