import React, { useState, useEffect } from "react";
import JobsDataService from '../services/jobs';

const JobEditDelete = props => {
  const initialJobState = {
    id: null,
    slug: "",
    title: "",
    description: "",
  };

  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getJob(props.slug);
  }, [props.slug]);

  const getJob = slug => {
    JobsDataService.get(slug)
      .then(response => {
        setCurrentJob(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

   const deleteJob = () => {
    JobsDataService.delete(currentJob.slug)
      .then(response => {
        props.refreshList();
        console.log(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  };

  //update
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentJob({ ...currentJob, [name]: value });
  };

    const updateJob = () => {
    JobsDataService.update(currentJob.slug, currentJob)
      .then(response => {
        setMessage("The Job offer was updated successfully!");
        props.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentJob ? (
         <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentJob.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentJob.description}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="btn btn-danger m-3" onClick={deleteJob}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateJob}
          >
            Update
          </button>
           <button
            type="submit"
            className="btn btn-info m-3"
            onClick={props.createJob}
          >
            Add New
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Job...</p>
        </div>
      )}
    </div>
  );
};

export default JobEditDelete;