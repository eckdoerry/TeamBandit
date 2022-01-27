import {Fragment, React} from "react";

const Course = ({course}) => {
  return (
      <Fragment>
          <div>
            <h3>
              {course}
            </h3>
          </div>
      </Fragment>
  );
}

export default Course;
