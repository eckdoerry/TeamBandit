import {Fragment, React} from "react";


import StudentList from './Components/StudentList';

const Students = ({courseInfo}) => {
    return(
    <Fragment>
        <div>
            <StudentList courseInfo={courseInfo}/>
        </div>
    </Fragment>
    );
}

export default Students;