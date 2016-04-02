import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"
import Time from "../../components/Time"
import GoHomeButton from "../../components/GoHomeButton"
import Avatar from "../../components/Avatar"
import styles from "./styles.css"
import { postIdToUrl } from "../../utils/link"

export default class Post extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string.isRequired,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    // const { config } = pkg

    const {
      __filename,
      __url,
      head,
      body,
    } = this.props

    invariant(
      typeof head.title === "string",
      `Your page '${ __filename }' needs a title`
    )

    const metaTitle = head.metaTitle ? head.metaTitle : head.title

    const meta = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: metaTitle },
      { property: "og:url", content: __url },
      { property: "og:description", content: head.description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: metaTitle },
      { name: "twitter:creator", content: `@${ pkg.twitter }` },
      { name: "twitter:description", content: head.description },
      { name: "description", content: head.description },
    ]

    return (
      <div>
        <Helmet
          title={ metaTitle }
          meta={ meta }
        />
        <GoHomeButton text="← Trang chủ" />
        <div className={ styles.wrapper }>
          <div className={ styles.text }>
            <h1>{ head.title }</h1>
            <div dangerouslySetInnerHTML={ { __html: body } } />
          </div>
          <div className={ styles.footer }>
            <div className={ styles.footerColumn }>
              <h2 className={ styles.footerHeading }>Tác giả</h2>

              <section>
                <div className={ styles.authorAvatar }>
                  <Avatar
                    template={ head.author.avatar }
                    size={ 80 }
                  />
                </div>
                <div className={ styles.authorInfo }>
                  <h3 className={ styles.authorName }>
                    { head.author.username }
                  </h3>
                  <span />
                  <p>
                    Đăng vào <Time time={ head.date } format="DD MMMM YYYY" />
                  </p>
                  <p>
                    <a
                      href={ postIdToUrl(head.id) }
                      target="_blank"
                    >
                      Bài viết gốc
                    </a>
                  </p>
                </div>
              </section>

            </div>
            <div className={ styles.footerColumn }>
              <h2 className={ styles.footerHeading }>Thông tin</h2>
              <p>
                Proudly published with
                <a href="http://moox.io/statinamic/"> Statinamic</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
