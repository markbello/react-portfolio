import React from 'react'
import { Feed, Header, Segment, Divider } from 'semantic-ui-react'
import _ from 'underscore'

class Post extends React.Component {

  state = {
    active: false,
    imageUrl: null,
    tagsList: null
  }

  toggleActive = () => {
    this.setState({
      active: !this.state.active
    })
  }

  componentDidMount = () => {
    this.listTags()
  }

  listTags = () => {
    console.log('listing tags')

    console.dir(this.props.activeTags)
    console.dir(this.props.tags)

    // const tagFilter = _.intersection(this.props.activeTags, this.props.tags)
    let filteredTags = ""

    if(this.props.activeTags){
      let filteredTagsArray = this.props.activeTags.filter((tag) => this.props.tags.includes(tag.id))
      filteredTagsArray.forEach((tag, idx) => {
        if(idx !== (filteredTagsArray.length - 1) && tag.name){
          filteredTags = filteredTags + tag.name + ", "
        } else{
          if(tag.name){
            filteredTags = filteredTags + tag.name
          }
        }
        this.setState({
          tagsList: filteredTags
        })
      })
    }



    console.log('filteredTags')
    // console.dir(_.intersection(this.props.activeTags, this.props.tags))
    console.dir(filteredTags)
  }

  render(){
    const excerpt = {
      __html: this.props.excerpt
    }

    const content = {
      __html: this.props.content
    }


    return (
      <Feed.Event>
        <Segment basic>

          <Feed.Content>
            <Feed.Label>
              <Header><a href='#' onClick={this.toggleActive}>{this.props.title.rendered}</a></Header>
              <Divider hidden />
          </Feed.Label>
            <Feed.Content>

              <div dangerouslySetInnerHTML={this.state.active ? content : excerpt}></div>

          </Feed.Content>
          <Divider hidden />
          <Feed.Extra>
            <Feed.Meta><em textAlign='right'>{this.state.tagsList}</em></Feed.Meta>
          </Feed.Extra>
          </Feed.Content>
        </Segment>
      </Feed.Event>
    )
  }
}

export default Post

// <Feed.Label>
//   <Image src={this.state.imageUrl} size='medium' />
// </Feed.Label>

// <Feed.Meta>{this.props.tags.map((tag) => `${tag.name}`)}</Feed.Meta>
