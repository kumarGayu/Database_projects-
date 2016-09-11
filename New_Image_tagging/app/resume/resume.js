var React = require('react');
var resumeconfig = require('./resumeconfig');
var Profile = require('./Profile');
var About = require('./About');
var Education = require('./Education');
var Skills = require('./Skills');
var Work = require('./Work');

var Resume = React.createClass({

    displayName: "Resume",

    render: function() {
        if (resumeconfig) {
          // console.log(resumeconfig.basics);
          var profile = resumeconfig.basics;
          var about = profile.summary;
          var work = resumeconfig.work;
          var education = resumeconfig.education;
          var skills = resumeconfig.skills;
          return (
              <div className="container">
                <div className="row">
                  <aside className="col-md-4">
                    <div className="inner">
                      <Profile profileData={profile} />
                    </div>
                  </aside>
                  <main className="col-md-8">
                    <div className="inner">
                      <Skills skillsData={skills} />
                      <About aboutData={about} />
                      <Work workData={work} />
                      <Education educationData={education} />
                    </div>
                  </main>
                </div>
              </div>
          )
        }else{
          return <p>Loading</p>
        }
    }
});

module.exports = Resume
