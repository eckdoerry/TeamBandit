import {Fragment, React} from "react";


import StudentList from './Components/StudentList';

const Students = ({courseInfo}) => {
    return(
    
        <StudentList courseInfo={courseInfo}/>
        
    );
}

export default Students;