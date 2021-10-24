
const JobDetail = props => {
    return(
        <div>
            <h4>Job Detail</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {props.job.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {props.job.description}
            </div>
             <div>
              <label>
                <strong>Skills:</strong>
              </label>{" "}
              <ul className="m-4" style={{display: 'inline-block'}}>
              {props.job.skills.map((x, i) => (
              <li key={i}>
                  {x.name}
              </li>
            )
            )}
            </ul>
            </div>
        </div>
    )
};

export default JobDetail;
