import {React, useState, useEffect} from 'react'

import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";

const SubmittedAssignmentsDownload = ({assignment}) => {
    const [assignments, setAssignments] = useState([]);
    
    const getAssignmentSubmissions = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/${assignment.assignment_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setAssignments(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const downloadAssignmentSubmissions = async () => {
        const zip = require('jszip')();
        console.log(assignments);
        for (let file = 0; file < assignments.length; file++) {
            // Zip file with the file name.
            var fileReader = new FileReader();
            fileReader.readAsArrayBuffer("/uploads/documents/studentAssignments/" + assignments[file].assignment_name);
            zip.file("/uploads/documents/studentAssignments/" + assignments[file].assignment_name, fileReader);
        } 
        zip.generateAsync({type: "blob"}).then(content => {
            saveAs(content, "example.zip");
        });
    };

    useEffect(() => {
        getAssignmentSubmissions();
    }, []);

    return (
        <Button
            sx={{ m: 1 }}
            variant="contained"
            color="success"
            onClick={() => (downloadAssignmentSubmissions())}
        >
            {" "}
            Download{" "}
        </Button>
  )
}

export default SubmittedAssignmentsDownload