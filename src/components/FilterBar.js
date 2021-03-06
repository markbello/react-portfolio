import React from 'react'
import {Menu, Checkbox, Dropdown, Divider, Responsive, Header} from 'semantic-ui-react'

class FilterBar extends React.Component {


  render() {
    const options = this.props.tags.map((tag) => {
      return {key: tag.slug, text: `${tag.name} (${tag.count})`, value: tag.id}
    })

    return (
      <Menu borderless stackable>
          <Menu.Item textAlign='center' header color='green' >Mark Bello | Full Stack Developer | <a style={{marginLeft: '5px'}} href='mailto:mark@nephewapps.com'> Email Me</a></Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item >
            <Checkbox defaultChecked label={{ children: 'Show Blog Posts' }} toggle value='blog' onChange={this.props.handleBlogToggle}/>
          </Menu.Item>
          <Menu.Item >
          <Checkbox defaultChecked label={{ children: 'Show Portfolio Items' }} value='portfolio' toggle onChange={this.props.handlePortfolioToggle} />
          </Menu.Item>
          <Menu.Item >
            <Dropdown fluid placeholder='Filter Content by Tags' multiple selection options={options} onChange={this.props.toggleOption} {...Responsive.onlyComputer}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default FilterBar
