import { React, useState, useEffect } from "react";

const AssignmentPage = () => {
    const windowValue = window.location.pathname.replace("/assignment/", "");
    const regExp = /%20/g;
    const windowString = windowValue.replace(regExp, " ");
    const assignmentCourse = windowString.split("-");

    return(
        <div>
            <h1> Assignments</h1>
            <h1> Window: {windowValue} </h1>
            <h1> WindowString: {windowString} </h1>
            <h1> Assingments: {assignmentCourse}</h1>
            <h1> Assignment Name: {assignmentCourse[0]} </h1>
            <h1> Assignment ID: {assignmentCourse[1]} </h1>
        </div>
    );
};

export default AssignmentPage;