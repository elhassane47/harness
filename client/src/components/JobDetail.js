
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
        </div>
    )
};

export default JobDetail;
