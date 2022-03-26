import {Fragment, React} from "react";

import AssignmentList from "./Components/AssignmentList";

const Assignments = ({ courseInfo, setRoute }) => {
    return(
        <>
            <AssignmentList courseInfo={courseInfo} setRoute={setRoute}/>
        </>
    );
}

export default Assignments;