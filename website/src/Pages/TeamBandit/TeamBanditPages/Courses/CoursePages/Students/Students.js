import {React} from "react";

// Page Components
import StudentList from './Components/StudentList';

const Students = ({courseInfo}) => {
    return(
        <StudentList courseInfo={courseInfo}/>
    );
}

export default Students;