import {React} from "react";

// Project Pages
import ScheduleList from "./Components/ScheduleList";

const Schedule = ({courseInfo, userInfo, userIdentifier}) => {
    return(
        <ScheduleList courseInfo={courseInfo} userInfo={userInfo} userIdentifier={userIdentifier}/>
    );
}

export default Schedule;