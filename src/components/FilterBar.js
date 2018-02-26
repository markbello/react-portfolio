import React from 'react'
import {Menu, Checkbox, Dropdown, Divider, Responsive, Header} from 'semantic-ui-react'

class FilterBar extends React.Component {


  render() {
    const options = this.props.tags.map((tag) => {
      return {key: tag.slug, text: `${tag.name} (${tag.count})`, value: tag.id}
    })

    return (
      <React.Fragment>
      <Responsive as={Menu} borderless {...Responsive.onlyComputer}>
          <Menu.Item textAlign='center' header color='green' >Mark Bello | Full Stack Developer</Menu.Item>
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
      </Responsive>

      <Responsive as={Menu} borderless stackable {...Responsive.onlyMobile}>
        <Menu.Item textAlign='center' color='green' >Mark Bello | Full Stack Developer</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item >
            <Checkbox defaultChecked label={{ children: 'Show Blog Posts' }} toggle value='blog' onChange={this.props.handleBlogToggle}/>
          </Menu.Item>
          <Menu.Item >
          <Checkbox defaultChecked label={{ children: 'Show Portfolio Items' }} value='portfolio' toggle onChange={this.props.handlePortfolioToggle} />
          </Menu.Item>
        </Menu.Menu>
        <Menu fixed='bottom'>
          <Menu.Item fluid >
          <Dropdown fluid placeholder='Filter Content by Tags' multiple upward selection options={options} onChange={this.props.toggleOption} />
          </Menu.Item>
        </Menu>
      </Responsive>

      <Responsive as={Menu} borderless stackable {...Responsive.onlyTablet}>
        <Menu.Item textAlign='center' color='green' >Mark Bello | Full Stack Developer</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item >
            <Checkbox defaultChecked label={{ children: 'Show Blog Posts' }} toggle value='blog' onChange={this.props.handleBlogToggle}/>
          </Menu.Item>
          <Menu.Item >
          <Checkbox defaultChecked label={{ children: 'Show Portfolio Items' }} value='portfolio' toggle onChange={this.props.handlePortfolioToggle} />
          </Menu.Item>
        </Menu.Menu>
        <Menu fixed='bottom'>
          <Menu.Item fluid >
          <Dropdown fluid placeholder='Filter Content by Tags' multiple upward selection options={options} onChange={this.props.toggleOption}/>
          </Menu.Item>
        </Menu>
      </Responsive>


      </React.Fragment>
    );
  }
}

export default FilterBar
