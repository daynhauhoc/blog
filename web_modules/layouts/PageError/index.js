import React, { Component, PropTypes } from "react"
import Link from "statinamic/lib/Link"

export default class PageError extends Component {

  static propTypes = {
    error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    errorText: PropTypes.string,
  };

  static defaultProps = {
    error: 404,
    errorText: "Page Not Found",
  }

  render() {
    const {
      error,
      errorText,
    } = this.props

    return (
      <div>
        <h1>{ error }</h1>
        <p>{ errorText }</p>
        <Link to="/">← Homepage</Link>
      </div>
    )
  }
}
