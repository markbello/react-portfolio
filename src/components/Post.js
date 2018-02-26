import React from 'react'
import { Feed, Header } from 'semantic-ui-react'

const Post = (props) => {
  const excerpt = {
    __html: props.excerpt
  }

  return (
    <Feed.Event>
      <Feed.Label>
      Blog Post
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Header>{props.title.rendered}</Header>
        </Feed.Summary>
        <Feed.Extra text>
          <div dangerouslySetInnerHTML={excerpt}></div>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  )
}

export default Post
