import React from 'react'
import Post from '../components/Post'
import { Feed } from 'semantic-ui-react'

class PostList extends React.Component {

  state = {
    posts: [],
    activePosts: []
  }

  componentDidMount = () => {
    this.fetchPosts()
    this.sortPostsByTag(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    this.sortPostsByTag(nextProps)
  }

  fetchPosts = () => {
    fetch('http://www.nephewapps.com/wp-json/wp/v2/posts')
    .then(res => res.json())
    .then(json => {

      this.setState({
        posts: json,
        activePosts: json
      })
    })
  }

  sortPostsByTag = (nextProps) => {
    if(nextProps.activeTags.length > 0) {
      let filteredPosts = []
      nextProps.activeTags.forEach((tag) => {
        this.state.posts.forEach((post) => {
          if(post.tags.includes(tag)){
            filteredPosts.push(post)
          }
        })
      })
      this.setState({
        activePosts: filteredPosts
      })
    } else{
      this.setState({
        activePosts: this.state.posts
      })
    }
  }

  render() {
    return (
      <Feed>
        {this.state.activePosts.map((post) => {
          return (
            <Post title={post.title} excerpt={post.excerpt.rendered} />
          )
        })}
      </Feed>
    )
  }
}

export default PostList

// <Post title={post.title} key={idx} />
