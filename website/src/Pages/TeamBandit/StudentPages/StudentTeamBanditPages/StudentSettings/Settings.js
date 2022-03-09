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
    const [fontValue, setFontValue] = useState("#00000");

    const [teamAssociation, setTeamAssociation] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [abstract, setAbstract] = useState("");
    const [videoLink, setVideoLink] = useState("");

    const [teamLogo, setTeamLogo] = useState(null);
    const [teamLogoFilename, setTeamLogoFilename] = useState(null);

    const [teamBackdrop, setTeamBackdrop] = useState(null);
    const [teamBackdropFilename, setTeamBackdropFilename] = useState(null);

    const onTeamLogoChange = (e) => {
        setTeamLogo(e.target.files[0]); 
    }

    const onTeamBackdropChange = (e) => {
        setTeamBackdrop(e.target.files[0]); 
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
            setTeamBackdropFilename(otherData[0].team_backdrop)
            setAbstract(otherData[0].team_description);
            setVideoLink(otherData[0].information_link);
            setFontValue(otherData[0].font_color);
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

    const updateFont = async (color) => {
        try {
            const body = { color };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateFont/${teamAssociation[0].team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );
            
            setFontValue(color);
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            
        }
    };

    const updateTeamName = async (team_id) => {
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

    const updateProjectAbstract = async (team_id) => {
        try {
            const body = { abstract };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateAbstract/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setAbstract(teamName);
            toast.success("Abstract was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Abstract did not change!");
        }
    };

    const updateVideoLink = async (team_id) => {
        try {
            const body = { videoLink };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateVideoLink/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setVideoLink(videoLink);
            toast.success("Video Link was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Video Link did not change!");
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

    const updateTeamBackdrop = async (e) => {
        e.preventDefault();
        if (!teamBackdrop)
        {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("teamBackdrop", teamBackdrop);
  
            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/teamBackdrop`, {method: "PUT", body: formData, headers: myHeaders});
  
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
                        style={{ padding: "5px", backgroundColor: `${colorValue}` }}
                        name="color"
                        defaultValue="CLICK HERE"
                        value={colorValue}
                        onChange={(color) => updateColor(color)}
                    />
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Change Team Website Font Color{" "}
                    </Typography>
                    <ColorPicker
                        style={{ padding: "5px", backgroundColor: `${fontValue}`}}
                        name="color"
                        defaultValue="CLICK HERE"
                        value={fontValue}
                        onChange={(color) => updateFont(color)}
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
                        Change Project Abstract{" "}
                    </Typography>
                    <TextField
                        style={{ padding: "5px" }}
                        fullWidth
                        sx={{ m: 2 }}
                        label="Project Abstract"
                        type="text"
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                    />
                    <Button
                        style={{ padding: "5px" }}
                        onClick={() =>
                            updateProjectAbstract(teamAssociation[0].team_id)
                        }
                    >
                        UPDATE PROJECT ABSTRACT 
                    </Button>
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Change Team Logo{" "}
                    </Typography>
                    <form onSubmit={updateTeamLogo} encType="multipart/form-data">
                        <input type="file" accept="images/*" name="teamLogo" onChange={onTeamLogoChange}/>
                        <Button style={{ padding: "5px" }} type="submit">Upload</Button>
                    </form>
                    {teamLogoFilename != null ? <img
                        src={"/uploads/images/teamLogos/" + teamLogoFilename}
                        alt=""
                        width="250px"
                        height="250px"
                    /> : null}
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Change Team Page Backdrop{" "}
                    </Typography>
                    <Typography style={{ padding: "5px" }} variant="caption">
                        {" "}
                        *Recommended 1920 x 1080{" "}
                    </Typography>
                    <form onSubmit={updateTeamBackdrop} encType="multipart/form-data">
                        <input type="file" accept="images/*" name="teamBackdrop" onChange={onTeamBackdropChange}/>
                        <Button style={{ padding: "5px" }} type="submit">Upload</Button>
                    </form>
                    {teamBackdropFilename != null ? <img
                        src={"/uploads/images/teamBackdrop/" + teamBackdropFilename}
                        alt=""
                        width="320px"
                        height="180px"
                    /> : null}
                    <Typography style={{ padding: "5px" }} variant="h6">
                        {" "}
                        Upload Information Video{" "}
                    </Typography>
                    <TextField
                        style={{ padding: "5px" }}
                        fullWidth
                        sx={{ m: 2 }}
                        label="Video Link"
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                    />
                    <Button
                        style={{ padding: "5px" }}
                        onClick={() =>
                            updateVideoLink(teamAssociation[0].team_id)
                        }
                    >
                        UPDATE VIDEO LINK
                    </Button>
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
