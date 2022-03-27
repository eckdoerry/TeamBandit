import {React} from "react";

// Project Pages
import ScheduleList from "./Components/ScheduleList";

const Schedule = ({courseInfo}) => {
    return(
        <ScheduleList courseInfo={courseInfo}/>
    );
}

export default Schedule;