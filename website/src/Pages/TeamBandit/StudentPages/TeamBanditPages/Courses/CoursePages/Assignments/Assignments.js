import {Fragment, React} from "react";

import StudentAssignmentList from "./Components/StudentAssignmentList";

const Assignments = ({ courseInfo, setRoute }) => {
    return(
        <>
            <StudentAssignmentList courseInfo={courseInfo} setRoute={setRoute}/>
        </>
    );
}

export default Assignments;