import React, { Component } from 'react';
import './App.css';
import PostList from './containers/PostList'
import { Grid, Transition, Segment, Header, Menu, Container, Dropdown, Checkbox} from 'semantic-ui-react'
import _ from 'underscore'
import FilterBar from './components/FilterBar'


class App extends Component {

  state = {
    tags: [],
    blog: true,
    portfolio: true,
    activeTags: [],
    posts: [],
    filters: {
      showBlog: true,
      showPortfolio: true,
      posts: []
    }
  }

  componentDidMount = () => {
    this.fetchTags()
    this.fetchPosts()
  }

  fetchTags = () => {
    fetch('https://www.nephewapps.com/wp-json/wp/v2/tags')
    .then(res => res.json())
    .then(json => {
      this.setState({
        tags: json
      }, () => {
        console.log(`now have ${this.state.posts.length} posts`)
      })
    })
  }

  fetchPosts = () => {
    fetch('https://www.nephewapps.com/wp-json/wp/v2/posts')
    .then(res => res.json())
    .then(json => {
      this.setState({
        posts: json
      }, () => this.sortPostsByTags())
    })
  }


  handlePortfolioToggle = () => {
    this.setState({
      portfolio: !this.state.portfolio,
      filters: {
        ...this.state.filters,
        showPortfolio: !this.state.portfolio
      }
    })
  }

  handleBlogToggle = () => {
    this.setState({
      blog: !this.state.blog,
      filters: {
        ...this.state.filters,
        showBlog: !this.state.blog
      }
    })
  }

  toggleOption = (e, data) => {
    let tags = data.value.map((tag, idx) => data.value[idx])
    this.setState({activeTags: tags}, () => this.sortPostsByTags())
  }

  sortPostsByTags = () => {
    let filteredPosts = []
    if(this.state.activeTags.length > 0){
      this.state.posts.forEach((post) =>
      {
        (_.intersection(post.tags, this.state.activeTags).length > 0 ? filteredPosts.push(post) : null)
      })
      this.setState({
        filters: {
          showBlog: this.state.blog,
          showPortfolio: this.state.portfolio,
          posts: filteredPosts
        }
      }, () => {console.dir(this.state)})
    } else{
      this.setState({
        filters: {
          showBlog: this.state.blog,
          showPortfolio: this.state.portfolio,
          posts: this.state.posts
        }
      })
    }
  }

    setColumnCount = () => {
      if(this.state.filters.showBlog && this.state.filters.showPortfolio){
        return 2
      } else{
        return 1
      }
    }

  render() {


    return (
      <div>
        <FilterBar
          tags={this.state.tags}
          handleBlogToggle={this.handleBlogToggle}
          handlePortfolioToggle={this.handlePortfolioToggle}
          toggleOption={this.toggleOption}/>

        <Container>
          <PostList activeTags={this.state.tags} filters={this.state.filters} columnCount={this.setColumnCount()}/>

        </Container>
      </div>
    );
  }
}

export default App;


// {this.state.blog && (<Grid.Column>
//     <Segment padded='very' attached='top' >
//       <Header as='h1' textAlign='center'>Dev Blog</Header>
//     </Segment>
//     <Segment attached padded='very'>
//       <PostList activeTags={this.state.activeTags} posts={this.state.posts}/>
//     </Segment>
//   </Grid.Column>)}
