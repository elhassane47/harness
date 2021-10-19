import React, { useState } from "react";
import JobsDataService from '../services/jobs';

const AddJob = (props) => {
  const initialJobState = {
    title: "",
    description: "",
  };
  const [Job, setJob] = useState(initialJobState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setJob({ ...Job, [name]: value });
  };

  const saveJob = () => {
    var data = {
      title: Job.title,
      description: Job.description
    };

    JobsDataService.create(data)
      .then(response => {
        setJob({
          title: response.data.title,
          description: response.data.description,
        });
        setSubmitted(true);
        props.refreshList();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newJob = () => {
    setJob(initialJobState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newJob}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={Job.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Job.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveJob} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddJob;