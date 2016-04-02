import React, { Component, PropTypes } from "react"
import { baseUrlHttp as baseUrl } from "../../../config"
import joinUri from "join-uri"

export default class Avatar extends Component {
  static propTypes = {
    template: PropTypes.string.isRequired,
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 120,
  }

  render() {
    const { template, size, ...props } = this.props
    const url = baseUrl + joinUri("/", template.replace("{size}", size))
    return (
      <img src={ url } { ...props } />
    )
  }
}
