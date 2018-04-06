import React from 'react'
import Post from '../components/Post'
import { Feed, Transition, Grid, Segment, Header, Loader } from 'semantic-ui-react'



class PostList extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    console.dir(nextProps)
  }

  renderBlogColumn = () => {
    const blogPosts = this.props.filters.posts.filter((post) => post.categories.includes(21))

    const activeTags = this.props.activeTags

    if(this.props.filters.showBlog){
      return (<Transition visible animation='scale' duration={1000}>
        <Grid.Column floated='left'>

          <Segment padded='very' attached='top' >
              <Header as='h1' textAlign='center'>Dev Blog</Header>
          </Segment>

          <Segment attached padded='very' >
            <Feed size='large'>
              {this.props.filters.posts.length == 0 ? <Loader active>Fetching Blog Posts</Loader> :

                blogPosts.map((post, idx) => {
                return (
                  <Post key={idx} title={post.title} excerpt={post.excerpt.rendered} content={post.content.rendered} imageId={post.featured_media} activeTags={activeTags} tags={post.tags}/>
                )
              })}
            </Feed>
          </Segment>
        </Grid.Column>
      </Transition>)
    }
  }

  renderPortfolioColumn = () => {
    const portfolioPosts = this.props.filters.posts.filter((post) => post.categories.includes(22))
    const activeTags = this.props.activeTags

    if(this.props.filters.showPortfolio){
      return (
        <Transition visible animation='scale' duration={1000}>

        <Grid.Column floated='right' >
          <Segment padded='very' attached='top' >
              <Header as='h1' textAlign='center'>Portfolio</Header>
          </Segment>
          <Segment attached padded='very' >
            <Feed size='large'>
              {this.props.filters.posts.length == 0 ? <Loader active>Fetching Portfolio Items</Loader> :
              portfolioPosts.map((post, idx) => {
                return (
                  <Post key={idx} title={post.title} excerpt={post.excerpt.rendered} content={post.content.rendered} imageId={post.featured_media} activeTags={activeTags} tags={post.tags}/>
                )
              })}
            </Feed>
          </Segment>
        </Grid.Column>
      </Transition>
    )
    }
  }

  render() {
    return (
      <Grid columns={this.props.columnCount} stackable padded='very' reversed='mobile'>
        {this.renderBlogColumn()}
        {this.renderPortfolioColumn()}
      </Grid>



    )
  }
}

export default PostList

// <Post title={post.title} key={idx} />
