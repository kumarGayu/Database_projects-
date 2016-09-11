var React = require('react');
var WorkItem = require('./WorkItem');

var Work = React.createClass({

  displayName: "Work",

  propTypes: {
      workData: React.PropTypes.array
  },

  getWorkExperience: function() {
    // console.log("getWorkExperience");
    // console.log(this.props.workData);
    var workItems = [];
    this.props.workData.map(function(val,i) {
      // console.log(val);
      workItems.push(<WorkItem key ={i} workItemData={val}/>);
    });
    return workItems;
  },

  render: function() {
      return (
          <section className="work">
            <h2 className="text-uppercase"><i className="fa fa-lg fa-building"></i> Work experience</h2>
            {this.getWorkExperience()}
          </section>
      )
  }

});

module.exports = Work
