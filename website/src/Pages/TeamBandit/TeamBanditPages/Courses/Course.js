import { Fragment, React } from "react";

import CourseCard from "./CourseCard";

const Course = ({courseInfo}) => {
    return (
        <Fragment>
            <div>
                <CourseCard courseInfo={courseInfo}/>
            </div>
        </Fragment>
    );
};

export default Course;
