import React, { PropTypes } from "react"
import moment from "moment"
moment.locale("vi")

const Time = ({ time, format, ...props }) => ((
  <time dateTime={ moment(time).format("YYYY-MM-DD") } { ...props }>
    { moment(time).format(format) }
  </time>
))

Time.propTypes = {
  time: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
}

export default Time
