import React, { useState } from "react";
import JobsDataService from '../services/jobs';

const AddJob = (props) => {
  const initialJobState = {
    title: "",
    description: "",
  };
  const [Job, setJob] = useState(initialJobState);
  const [skills, setSkills] = useState([{'name': ''} ]);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setJob({ ...Job, [name]: value });
  };

  const handleInputSkill = (e, index) => {
    const { name, value } = e.target;
    let sk = [...skills];
    sk[index]["name"] = value;
    setSkills(sk);
  };

  const addSkill = event => {
    event.preventDefault();
    setSkills([...skills, { name: ""}]);
  };


  const saveJob = () => {
    var data = {
      title: Job.title,
      description: Job.description,
      skills: skills
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

                      <div className="m-3">
              <label>Skills</label>
            {skills.map((x, i) => (
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={x.name}
                  onChange={e => handleInputSkill(e, i)}
              />
              </div>
            )
            )}
          <button
            className="btn"
            onClick={addSkill}
          >
            Add Skill
          </button>
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