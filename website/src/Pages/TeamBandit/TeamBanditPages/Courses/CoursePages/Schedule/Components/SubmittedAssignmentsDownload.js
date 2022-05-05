import {React, useState} from 'react';

import Button from "@mui/material/Button";
import FileSaver from 'file-saver';

const SubmittedAssignmentsDownload = ({assignment, disabled, setDisabled}) => {

    //const [disabled, setDisabled] = useState(false);

    const removeDownloadedZip = async (filename) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/schedule/deleteZip/${filename}`,
                { method: "DELETE", headers: { token: localStorage.token } }
            );
            return await response.json();
        } catch (err) {
            console.error(err.message);
        }
    }

    const downloadAssignmentSubmissions = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/schedule/createZip/${assignment.assignment_id}`,
                { method: "POST", headers: { token: localStorage.token } }
            );
            return await response.json();
        } catch (err) {
            console.error(err.message);
        }
    };

    const downloadAndRemoveZip = async () => {
        setDisabled(true);
        // Entire path is returned
        const zipPath = await downloadAssignmentSubmissions();
        // Creating the actual download action here
        /*
        const link = document.createElement("a");
        // Regex gets filename and extension only
        link.download = `${zipPath.split(/.*[/|\\]/)[1]}`;
        link.href = process.env.PUBLIC_URL + zipPath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        */
        FileSaver.saveAs(process.env.PUBLIC_URL + zipPath, zipPath.split(/.*[/|\\]/)[1]);
        setTimeout(() => removeDownloadedZip(zipPath.split(/.*[/|\\]/)[1]), 10000);
        setDisabled(true);
        //setTimeout(() => setDisabled(false), 30000);
    }

    return (
        <div style={{display: "flex"}}>
            <Button
                sx={{ m: 1 }}
                variant="contained"
                color="success"
                disabled={disabled}
                onClick={() => (downloadAndRemoveZip())}
            >
                {" "}
                Download All (zip){" "}
            </Button>
            {disabled &&
                <p>Download again in 30 seconds</p>
            }
        </div>
  )
}

export default SubmittedAssignmentsDownload