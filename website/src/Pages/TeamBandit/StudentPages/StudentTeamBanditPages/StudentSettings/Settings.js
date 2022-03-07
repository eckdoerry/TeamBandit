import { Fragment, React, useState, useEffect } from "react";

// MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Color Picker for React
import ColorPicker from "material-ui-color-picker";

import { toast } from "react-toastify";

const Settings = ({ studentInfo }) => {
    const [studentTeam, setStudentTeam] = useState([]);
    const [studentTeamChange, setStudentTeamChange] = useState(false);
    const [isTeamLead, setTeamLead] = useState(false);
    const [colorValue, setColorValue] = useState("#00000");
    const [teamAssociation, setTeamAssociation] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [teamLogoFilename, setTeamLogoFilename] = useState(null);

    const onFileChange = (e) => {
        setTeamLogo(e.target.files[0]); 
    }

    const getTeamLead = async () => {
        try {
            const teams = await fetch(
                `${process.env.REACT_APP_BASEURL}/students/team-association/${studentInfo.student_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await teams.json();

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/students/is-team-lead/${studentInfo.student_id}/${jsonData[0].team_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const otherData = await response.json();

            if (otherData.length > 0) {
                setTeamLead(true);
            } else {
                setTeamLead(false);
            }
            setStudentTeam(otherData);
            setTeamAssociation(jsonData);
            setColorValue(otherData[0].page_color);
            setTeamName(otherData[0].team_name);
            setTeamLogoFilename(otherData[0].team_logo);
        } catch (err) {
            console.error(err.message);
        }
    };

    const updateColor = async (color) => {
        try {
            const body = { color };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateColor/${teamAssociation[0].team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );
            
            setColorValue(color);
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            
        }
    };

    const updateTeamName = async (team_id) => {
        console.log(team_id);
        try {
            const body = { teamName };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTeamName/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTeamName(teamName);
            toast.success("Team name was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Team name did not change!");
        }
    };

    const updateTeamLogo = async (e) => {
        e.preventDefault();
        if (!teamLogo)
        {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("teamLogo", teamLogo);
  
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/teamLogo`, {method: "PUT", body: formData, headers: myHeaders});
  
            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };

    useEffect(() => {
        getTeamLead();
        setStudentTeamChange(false);
    }, [studentTeamChange]);

    if (isTeamLead) {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Paper style={{ padding: "25px" }} elevation={3}>
                    <Typography
                        style={{
                            borderBottom: "1px solid black",
                            borderBottomWidth: "thin",
                            width: "15%",
                        }}
                        variant="h4"
                        gutterBottom
                    >
                        Settings
                    </Typography>
                    <Typography style={{ padding: "5px" }} variant="h5">
                        {" "}
                        TEAM LEAD ACTIONS:{" "}
                    </Typography>
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Change Team Page Color{" "}
                    </Typography>
                    <ColorPicker
                        style={{ padding: "5px" }}
                        name="color"
                        defaultValue="COLOR"
                        value={colorValue}
                        onChange={(color) => updateColor(color)}
                    />
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Change Team Name{" "}
                    </Typography>
                    <TextField
                        style={{ padding: "5px" }}
                        fullWidth
                        sx={{ m: 2 }}
                        label="Project Name"
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                    <Button
                        style={{ padding: "5px" }}
                        onClick={() =>
                            updateTeamName(teamAssociation[0].team_id)
                        }
                    >
                        UPDATE TEAM NAME
                    </Button>
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Change Team Logo{" "}
                    </Typography>
                    <form onSubmit={updateTeamLogo} encType="multipart/form-data">
                        <input type="file" accept="images/*" name="teamLogo" onChange={onFileChange}/>
                        <Button style={{ padding: "5px" }} type="submit">Upload</Button>
                    </form>
                    <img
                        src={"/uploads/images/teamLogos/" + teamLogoFilename}
                        alt=""
                    />
                </Paper>
            </div>
        );
    } else {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Paper style={{ padding: "25px" }} elevation={3}>
                    <Typography
                        style={{
                            borderBottom: "1px solid black",
                            borderBottomWidth: "thin",
                            width: "15%",
                        }}
                        variant="h4"
                        gutterBottom
                    >
                        Settings
                    </Typography>
                    <Typography variant="overline"> YOU ARE NOT TEAM LEAD</Typography>
                </Paper>
            </div>
        );
    }
};

export default Settings;
