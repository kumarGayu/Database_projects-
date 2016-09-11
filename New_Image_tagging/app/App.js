var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var Mainapp = require('./Mainapp');
var Main = require('./components/Main');
var Resume = require('./resume/Resume');

var useRouterHistory = require('react-router').useRouterHistory;
var createHashHistory = require('history').createHistory;
var appHistory = useRouterHistory(createHashHistory)({ queryKey: false});

var App = React.createClass({
  render: function(){
      return (
        <Router useKey={false} history={appHistory}>
          <Route path="/Projects" component={Mainapp}>
            <IndexRoute component={Resume} />
            <Route path="about" component={Resume} />
            <Route path="llama" component={Main} />
          </Route>
        </Router>
      );
    }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
