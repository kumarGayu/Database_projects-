var React = require('react');

var Panel = React.createClass({

    render: function() {
        return (
            <div className="panel">
                {this.props.children}
            </div>
            );
    }
});

module.exports = Panel;

