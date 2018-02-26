import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './containers/PostList'
import { Button, Grid, Sidebar, Segment, Header, Menu, Icon, Container, Image, Dropdown, Checkbox} from 'semantic-ui-react'

class App extends Component {

  state = {
    tags: [],
    blog: true,
    portfolio: false,
    activeTags: []
  }

  componentDidMount = () => {
    this.fetchTags()
  }

  fetchTags = () => {
    fetch('http://www.nephewapps.com/wp-json/wp/v2/tags')
    .then(res => res.json())
    .then(json => {

      this.setState({
        tags: json,
        activeTags: json
      }, () => console.log(this.state))
    })
  }


  handlePortfolioToggle = () => {
    this.setState({portfolio: !this.state.portfolio}, () => console.log(this.state))
  }

  handleBlogToggle = () => {
    this.setState({blog: !this.state.blog})
  }

  toggleOption = (e, data) => {
    let tags = data.value.map((tag, idx) => data.value[idx])
    this.setState({activeTags: tags}, () => console.log(this.state))
  }

  render() {
    const options = this.state.tags.map((tag) => {
      return {key: tag.slug, text: `${tag.name} (${tag.count})`, value: tag.id}
    })
    return (
      <div>

        <Menu borderless>
            <Menu.Item basic header color='green' >Mark Bello | Full Stack Developer</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item basic>
              <Checkbox inverted defaultChecked label={{ children: 'Show Blog Posts' }} toggle value='blog' onChange={this.handleBlogToggle}/>
            </Menu.Item>
            <Menu.Item basic>
              <Checkbox label={{ children: 'Show Portfolio Items' }} value='portfolio' toggle onChange={this.handlePortfolioToggle} />
            </Menu.Item>
            <Menu.Item basic>
              <Dropdown fluid placeholder='Filter Content by Tags' multiple selection options={options} onChange={this.toggleOption} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>



        <Container>
          <Grid columns={2} stackable padded>
            <Grid.Column>
              <Segment padded='very' attached='top'>
                <Header as='h1' textAlign='center'>Dev Blog</Header>
                </Segment>
                <Segment attached padded='very'>
                <PostList activeTags={this.state.activeTags}/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment padded='very' attached='top'>
                <Header as='h1' textAlign='center'>Portfolio</Header>
                </Segment>
                <Segment attached padded='very'>
                <PostList activeTags={this.state.activeTags}/>
              </Segment>
            </Grid.Column>

          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;


// <ul>
// {this.state.posts.map((post, idx) => {
//   return <li key={idx}>{post.title.rendered}</li>
// })}
// </ul>
