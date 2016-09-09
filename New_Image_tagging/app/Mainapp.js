var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Button = require('./components/Button');
var Main = require('./components/Main');
var routerHistory = require('react-router').useRouterHistory;
var createHistory = require('history').createHashHistory;

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

var appHistory = routerHistory(createHistory)({ queryKey: false });

var Mainapp = React.createClass({
    getInitialState: function () {
    return {
      activeKey: '1'
    }
  },
    handleSelect: function(eventKey) {
        this.setState({
        activeKey: eventKey
      });
    },
    render: function(){
       return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
        <NavItem eventKey="1"><Link eventKey="1" to="/home">Home</Link></NavItem>
        <NavItem eventKey="2"><Link to="/llama">NavItem 2 content</Link></NavItem>
        <NavItem eventKey="3" disabled>NavItem 3</NavItem>
        <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
          <MenuItem eventKey="4.1">Action</MenuItem>
          <MenuItem eventKey="4.2">Another action</MenuItem>
          <MenuItem eventKey="4.3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Separated link</MenuItem>
        </NavDropdown>
      </Nav>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
    }
});
module.exports = Mainapp;