import { Fragment, React } from "react";

import CourseCard from "./CourseCard";

const Course = ({courseInfo, courseChange}) => {
    
    return (
        <Fragment>
            <div>
            {courseInfo.course_title !== null && <CourseCard courseInfo={courseInfo} setCoursesChange={courseChange}/>}
            </div>
        </Fragment>
    );
};

export default Course;
