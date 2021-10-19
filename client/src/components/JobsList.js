import React, {useEffect, useState} from "react";
import JobsDataService from '../services/jobs';
import SkillsDataService from '../services/skills';
import AddJob from "./AddJob";
import JobEditDelete from "./JobEditDelete";
import JobDetail from "./JobDetail";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [top_skills, setTopSkills] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveJobs();
    retrieveSkills();
  }, []);

    const refreshList = () => {
    retrieveJobs();
    setCurrentJob(null);
    setCurrentIndex(-1);
  };

  const createJob = () => {
    setCurrentJob(null);
    setCurrentIndex(-1);
  }

  const retrieveSkills = () =>{
    SkillsDataService.top_skills()
      .then(response => {
        setTopSkills(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const retrieveJobs = () => {
    JobsDataService.getAll()
      .then(response => {
        setJobs(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Job List</h4>
        <ul className="list-group">
          {jobs &&
            jobs.map((job, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveJob(job, index)}
                key={index}
              >
                {job.title}
              </li>
            ))}
        </ul>

        <h4>Top skills: </h4>
        <ul className="list-group">
          {top_skills &&
            top_skills.map((skill, i) => (
              <li
                className="list-group-item"
                key={i}
              >
                {skill.skills__name}({skill.count})
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <JobDetail job={currentJob} />
            <JobEditDelete
                createJob={createJob}
                id={currentJob.id}
                refreshList={refreshList}
            />
          </div>
        ) : (
          <AddJob refreshList={refreshList}/>
        )}

      </div>
    </div>
  );
};

export default JobsList;
