import {React} from "react";

// Project Pages
import ScheduleList from "./Components/ScheduleList";

const Schedule = ({courseInfo, userIdentifier}) => {
    return(
        <ScheduleList courseInfo={courseInfo} userIdentifier={userIdentifier}/>
    );
}

export default Schedule;