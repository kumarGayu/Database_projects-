var React = require('react');
var reasonconfig = require('./reasonconfig');
var Link = require('react-router').Link;

var reasons = React.createClass({

	displayName: "reasons",

	getReasons:function(){
		var res = [];
		res.push(<h4 key={"1"} className="text-uppercase">{reasonconfig.react.name}</h4>);
		res.push(this.getReason(reasonconfig.react.reasons));
		res.push(<h4 key={"2"} className="text-uppercase">{reasonconfig.architect.name}</h4>);
		res.push(<h6 key={"3"} className="text-uppercase"><strong>{reasonconfig.architect.description}</strong></h6>);
		res.push(this.getReason(reasonconfig.architect.reasons));
		res.push(<h4 key={"4"}className="text-uppercase">{reasonconfig.development.name}</h4>);
		res.push(this.getReason(reasonconfig.development.reasons));

		return res;
	},

	getReason:function(reasons){
		var reason = reasons.map(function(val,key){
			return <li key={key}><em>{val}</em></li>
		});
		return <ul>{reason}</ul>
	},

	render: function() {
		return (
		<div className="container">
			<div className="span12">
				{this.getReasons()}
			</div>
		</div>
	)
	}

});

module.exports = reasons