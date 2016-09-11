var React = require('react');

var Skills = React.createClass({

  displayName: "Skills",

  propTypes: {
      skillsData: React.PropTypes.array
  },

  getSkillsofEachProfile: function(){
    var skillset = [];
    this.props.skillsData.map(function(skills){
      var getSkills = skills.keywords.map(function(item) {
        return (<li><span className="label label-success">{item}</span></li>)
      });
      skillset.push(<h2>{skills.name}</h2>);
      skillset.push(<ul className="skills-list list-inline">{getSkills}</ul>);
    });
    return skillset;
  },

  render: function() {
  	return (
  	  <section className="skills">
        <h2 className="text-uppercase"><i className="fa fa-lg fa-code"></i> Skills</h2>
        {this.getSkillsofEachProfile()}
      </section>
  	)
  }
});

module.exports = Skills;
