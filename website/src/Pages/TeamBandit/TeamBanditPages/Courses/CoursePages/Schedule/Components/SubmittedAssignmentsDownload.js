import {React} from 'react';

import Button from "@mui/material/Button";

const SubmittedAssignmentsDownload = ({assignment}) => {

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
        // Entire path is returned
        const zipPath = await downloadAssignmentSubmissions();
        // Creating the actual download action here
        const link = document.createElement("a");
        // Regex gets filename and extension only
        link.download = `${zipPath.split(/.*[/|\\]/)[1]}`;
        link.href = process.env.PUBLIC_URL + zipPath;
        link.click();
        setTimeout(() => removeDownloadedZip(zipPath.split(/.*[/|\\]/)[1]), 10000);
    }

    return (
        <Button
            sx={{ m: 1 }}
            variant="contained"
            color="success"
            onClick={() => (downloadAndRemoveZip())}
        >
            {" "}
            Download All (zip){" "}
        </Button>
  )
}

export default SubmittedAssignmentsDownload