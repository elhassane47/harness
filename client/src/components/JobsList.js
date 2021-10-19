import React, {useEffect, useState} from "react";
import JobsDataService from '../services/jobs';
import AddJob from "./AddJob";
import JobEditDelete from "./JobEditDelete";
import JobDetail from "./JobDetail";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    retrieveJobs();
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

      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <JobDetail job={currentJob} />
            <JobEditDelete
                createJob={createJob}
                slug={currentJob.slug}
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
