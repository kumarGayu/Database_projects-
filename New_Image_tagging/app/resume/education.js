var React = require('react');
var moment = require('moment');

var Education = React.createClass({

  displayName: "Education",

  propTypes: {
      educationData: React.PropTypes.array
  },

  render: function() {
  	var getEducation = 	this.props.educationData.map(function(item) {
  		var startdate = moment(item.startDate).format("MMM, YYYY");
  		var enddate = moment(item.endDate).format("MMM, YYYY");
      var getCourses = item.courses.map(function(course){
        return (<li>{course}</li>);
      });
  		return (
          <div>
            <h3>{item.studyType} {item.area}</h3>
  				  <h4>{item.institution}</h4>
  				  <p>Studied: {startdate} - {enddate}</p>
            <p>GPA: {item.gpa}</p>
            <p>COURSES:</p>
            <ul>{getCourses}</ul>
  				</div>
        )
  	});
  	return (
  	  <section className="education">
        <h2 className="text-uppercase"><i className="fa fa-lg fa-mortar-board"></i> Education</h2>
        {getEducation}
      </section>
  	)
  }

});

module.exports = Education
