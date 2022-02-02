import { Fragment, React } from "react";

import CourseCard from "./CourseCard";

const Course = ({courseInfo}) => {
    return (
        <Fragment>
            <div>
            {courseInfo.course_title !== null && <CourseCard courseInfo={courseInfo}/>}
            </div>
        </Fragment>
    );
};

export default Course;
