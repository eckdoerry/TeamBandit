import { Fragment, React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

// Color Picker for React
import ColorPicker from "material-ui-color-picker";

import EditPassword from "./Components/EditPassword";

import { toast } from "react-toastify";

const style = {
    position: "absolute",
    left: "25%",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const Settings = ({
    userInfo,
    setUserChange,
    userIdentifier
}) => {
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

    const [problemDesc, setProblemDesc] = useState("");
    const [solutionDesc, setSolutionDesc] = useState("");
    const [reqOverview, setReqOverview] = useState("");
    const [keyReq, setKeyReq] = useState("");
    const [techSum, setTechSum] = useState("");
    const [techName1, setTechName1] = useState("");
    const [techName2, setTechName2] = useState("");
    const [techName3, setTechName3] = useState("");
    const [techName4, setTechName4] = useState("");
    const [techDes1, setTechDes1] = useState("");
    const [techDes2, setTechDes2] = useState("");
    const [techDes3, setTechDes3] = useState("");
    const [techDes4, setTechDes4] = useState("");
    const [devStrat, setDevStrat] = useState("");

    const [archImage, setArchImage] = useState(null);
    const [archImageFilename, setArchImageFilename] = useState(null);
    const [schedImg, setSchedImg] = useState(null);
    const [schedImgFilename, setSchedImgFilename] = useState(null);

    const [techImg1, setTechImg1] = useState(null);
    const [techImg1Filename, setTechImg1Filename] = useState(null);
    const [techImg2, setTechImg2] = useState(null);
    const [techImg2Filename, setTechImg2Filename] = useState(null);
    const [techImg3, setTechImg3] = useState(null);
    const [techImg3Filename, setTechImg3Filename] = useState(null);
    const [techImg4, setTechImg4] = useState(null);
    const [techImg4Filename, setTechImg4Filename] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Reset Preferences
    };

    const onTeamLogoChange = (e) => {
        setTeamLogo(e.target.files[0]);
    };

    const onTeamBackdropChange = (e) => {
        setTeamBackdrop(e.target.files[0]);
    };

    const onArchImgChange = (e) => {
        setArchImage(e.target.files[0]);
    };

    const onTechLogo1Change = (e) => {
        setTechImg1(e.target.files[0]);
    };

    const onTechLogo2Change = (e) => {
        setTechImg2(e.target.files[0]);
    };

    const onTechLogo3Change = (e) => {
        setTechImg3(e.target.files[0]);
    };

    const onTechLogo4Change = (e) => {
        setTechImg4(e.target.files[0]);
    };

    const onSchedImgChange = (e) => {
        setSchedImg(e.target.files[0]);
    };

    const getTeamLead = async () => {
        if (userIdentifier == "organizer") {
            return;
        }
        try {
            const teams = await fetch(
                `${process.env.REACT_APP_BASEURL}/students/team-association/${userInfo.student_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await teams.json();

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/students/is-team-lead/${userInfo.student_id}/${jsonData[0].team_id}`,
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
            setTeamBackdropFilename(otherData[0].team_backdrop);
            setAbstract(otherData[0].team_description);
            setVideoLink(otherData[0].information_link);
            setFontValue(otherData[0].font_color);

            setProblemDesc(otherData[0].problem_description);
            setSolutionDesc(otherData[0].solution_description);
            setArchImageFilename(otherData[0].architecture_image);
            setReqOverview(otherData[0].requirements_overview);
            setKeyReq(otherData[0].key_requirements);
            setTechSum(otherData[0].technology_summary);
            setTechImg1Filename(otherData[0].tech_img_1);
            setTechImg2Filename(otherData[0].tech_img_2);
            setTechImg3Filename(otherData[0].tech_img_3);
            setTechImg4Filename(otherData[0].tech_img_4);
            setTechName1(otherData[0].tech_name_1);
            setTechName2(otherData[0].tech_name_2);
            setTechName3(otherData[0].tech_name_3);
            setTechName4(otherData[0].tech_name_4);
            setTechDes1(otherData[0].tech_description_1);
            setTechDes2(otherData[0].tech_description_2);
            setTechDes3(otherData[0].tech_description_3);
            setTechDes4(otherData[0].tech_description_4);
            setDevStrat(otherData[0].development_strategy);
            setSchedImgFilename(otherData[0].schedule_image);
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

    const updateProblemDesc = async (team_id) => {
        try {
            const body = { problemDesc };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateProblemDesc/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setProblemDesc(teamName);
            toast.success("Problem Desc was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Problem desc did not change!");
        }
    };

    const updateSolutionDesc = async (team_id) => {
        try {
            const body = { solutionDesc };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateSolutionDesc/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setSolutionDesc(teamName);
            toast.success("Solution Desc was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Solution desc did not change!");
        }
    };

    const updateReqOverview = async (team_id) => {
        try {
            const body = { reqOverview };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateReqOverview/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setReqOverview(teamName);
            toast.success("Req overview was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Req overview did not change!");
        }
    };

    const updateKeyReq = async (team_id) => {
        try {
            const body = { keyReq };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateKeyReq/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setKeyReq(teamName);
            toast.success("Key Req overview was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Key Req overview did not change!");
        }
    };

    const updateTechSum = async (team_id) => {
        try {
            const body = { techSum };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechSum/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechSum(teamName);
            toast.success("Tech sum was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech sum did not change!");
        }
    };

    const updateTechName1 = async (team_id) => {
        try {
            const body = { techName1 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechName1/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechName1(teamName);
            toast.success("Tech name 1 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech name 1 did not change!");
        }
    };

    const updateTechName2 = async (team_id) => {
        try {
            const body = { techName2 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechName2/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechName2(teamName);
            toast.success("Tech name 2 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech name 2 did not change!");
        }
    };

    const updateTechName3 = async (team_id) => {
        try {
            const body = { techName3 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechName3/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechName3(teamName);
            toast.success("Tech name 3 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech name 3 did not change!");
        }
    };

    const updateTechName4 = async (team_id) => {
        try {
            const body = { techName4 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechName4/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechName4(teamName);
            toast.success("Tech name 4 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech name 4 did not change!");
        }
    };

    const updateTechDes1 = async (team_id) => {
        try {
            const body = { techDes1 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechDes1/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechDes1(teamName);
            toast.success("Tech des 1 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech des 1 did not change!");
        }
    };

    const updateTechDes2 = async (team_id) => {
        try {
            const body = { techDes2 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechDes2/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechDes2(teamName);
            toast.success("Tech des 2 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech des 2 did not change!");
        }
    };

    const updateTechDes3 = async (team_id) => {
        try {
            const body = { techDes3 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechDes3/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechDes3(teamName);
            toast.success("Tech des 3 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech des 3 did not change!");
        }
    };

    const updateTechDes4 = async (team_id) => {
        try {
            const body = { techDes4 };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateTechDes4/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setTechDes4(teamName);
            toast.success("Tech des 4 was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Tech des 4 did not change!");
        }
    };
    const updateDevStrat = async (team_id) => {
        try {
            const body = { devStrat };

            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");

            await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/updateDevStrat/${team_id}`,
                {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(body),
                }
            );

            setDevStrat(teamName);
            toast.success("Dev strat was successfully changed!");
            setStudentTeamChange(true);
        } catch (err) {
            console.error(err.message);
            toast.error("Dev strat did not change!");
        }
    };

    const updateTeamLogo = async (e) => {
        e.preventDefault();
        if (!teamLogo) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("teamLogo", teamLogo);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/teamLogo`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };
    
    const updateSchedImg = async (e) => {
        e.preventDefault();
        if (!schedImg) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("schedImg", schedImg);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/updateSchedImg`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };

    const updateTechLogo1 = async (e) => {
        e.preventDefault();
        if (!techImg1) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("techImg1", techImg1);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/techImg1`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };

    const updateTechLogo2 = async (e) => {
        e.preventDefault();
        if (!techImg2) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("techImg2", techImg2);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/techImg2`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };

    const updateTechLogo3 = async (e) => {
        e.preventDefault();
        if (!techImg3) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("techImg3", techImg3);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/techImg3`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };

    const updateTechLogo4 = async (e) => {
        e.preventDefault();
        if (!techImg4) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("techImg4", techImg4);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/techImg4`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };

    const updateArchImg = async (e) => {
        e.preventDefault();
        if (!archImage) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("archImage", archImage);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/archImage`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setStudentTeamChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update!");
        }
    };

    const updateTeamBackdrop = async (e) => {
        e.preventDefault();
        if (!teamBackdrop) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("teamBackdrop", teamBackdrop);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/teamBackdrop`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

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

    if (localStorage.getItem('user') == "organizer") {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Typography variant="h2" gutterBottom>
                    Account Settings
                </Typography>
                <Paper style={{ padding: "25px" }} elevation={3}>
                    <Typography
                        style={{
                            borderBottom: "1px solid black",
                            borderBottomWidth: "thin",
                            width: "20%",
                        }}
                        variant="h4"
                        gutterBottom
                    >
                        {" "}
                        Password Settings{" "}
                    </Typography>
                    <EditPassword userInfo={userInfo} setUserChange={setUserChange} userIdentifier={userIdentifier}/>
                </Paper>
            </div>
        );
    } else if (localStorage.getItem('user') == "student") {
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
                        <EditPassword userInfo={userInfo} setUserChange={setUserChange} userIdentifier={userIdentifier}/>
                        <Typography style={{ padding: "5px" }} variant="h5">
                            {" "}
                            TEAM LEAD ACTIONS:{" "}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Team Website Link:{" "}
                        </Typography>
                        {teamAssociation.length != 0 ? <Link
                            target="_blank"
                            to={`/team-website/${teamAssociation[0].team_id}`}
                        >
                            {" "}
                            <Typography variant="h5">{studentTeam[0].team_name}</Typography>
                        </Link> :  null}
                        
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Team Name{" "}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h8">
                            {teamName}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Team Logo{" "}
                        </Typography>

                        {teamLogoFilename != null ? (
                            <img
                                src={
                                    "/uploads/images/teamLogos/" +
                                    teamLogoFilename
                                }
                                alt=""
                                width="250px"
                                height="250px"
                            />
                        ) : null}
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Team Page Color{" "}
                        </Typography>
                        <div
                            style={{
                                width: "500px",
                                height: "50px",
                                backgroundColor: `${colorValue}`,
                                border: "1px solid black",
                            }}
                        ></div>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Team Website Font Color{" "}
                        </Typography>
                        <div
                            style={{
                                width: "500px",
                                height: "50px",
                                backgroundColor: `${fontValue}`,
                                border: "1px solid black",
                            }}
                        ></div>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Project Abstract{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {abstract}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Problem Description{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {problemDesc}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Solution Description{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {solutionDesc}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Architecture Image{" "}
                        </Typography>

                        {archImageFilename != null ? (
                            <img
                                src={
                                    "/uploads/images/architecture/" +
                                    archImageFilename
                                }
                                alt=""
                                width="320px"
                                height="180px"
                            />
                        ) : null}
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Requirements Overview{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {reqOverview}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Key Requirements: separate each requirement with a comma{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {keyReq}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology Summary{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {techSum}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 1{" "}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h8">
                            {techName1}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 1 Description{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {techDes1}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 1 Image {" "}
                        </Typography>

                        {techImg1Filename != null ? (
                            <img
                                src={
                                    "/uploads/images/techLogos/" +
                                    techImg1Filename
                                }
                                alt=""
                                width="250px"
                                height="250px"
                            />
                        ) : null}
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 2{" "}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h8">
                            {techName2}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 2 Description{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {techDes2}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 2 Image{" "}
                        </Typography>

                        {techImg2Filename != null ? (
                            <img
                                src={
                                    "/uploads/images/techLogos/" +
                                    techImg2Filename
                                }
                                alt=""
                                width="250px"
                                height="250px"
                            />
                        ) : null}
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 3{" "}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h8">
                            {techName3}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 3 Description{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {techDes3}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 3 Image{" "}
                        </Typography>

                        {techImg3Filename != null ? (
                            <img
                                src={
                                    "/uploads/images/techLogos/" +
                                    techImg3Filename
                                }
                                alt=""
                                width="250px"
                                height="250px"
                            />
                        ) : null}
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 4{" "}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h8">
                            {techName4}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 4 Description{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {techDes4}
                        </Typography>
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Technology 4 Image{" "}
                        </Typography>

                        {techImg4Filename != null ? (
                            <img
                                src={
                                    "/uploads/images/techLogos/" +
                                    techImg4Filename
                                }
                                alt=""
                                width="250px"
                                height="250px"
                            />
                        ) : null}
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Development Strategy{" "}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                            variant="paragraph"
                        >
                            {devStrat}
                        </Typography>

                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Schedule Image{" "}
                        </Typography>

                        {schedImgFilename != null ? (
                            <img
                                src={
                                    "/uploads/images/schedules/" +
                                    schedImgFilename
                                }
                                alt=""
                                width="320px"
                                height="180px"
                            />
                        ) : null}
                        <Typography style={{ padding: "5px" }} variant="h6">
                            {" "}
                            Team Page Backdrop{" "}
                        </Typography>
                        {teamBackdropFilename != null ? (
                            <img
                                src={
                                    "/uploads/images/teamBackdrop/" +
                                    teamBackdropFilename
                                }
                                alt=""
                                width="320px"
                                height="180px"
                            />
                        ) : null}

                        <Button
                            fullWidth
                            style={{ padding: "5px" }}
                            onClick={handleOpen}
                        >
                            UPDATE INFORMATION
                        </Button>
                    </Paper>
                    <Modal
                        style={{overflow: "scroll", height: "100vh"}}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box>
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Edit Settings
                                </Typography>
                            </Box>
                            <div>
                            <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
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
                                    onChange={(e) =>
                                        setTeamName(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTeamName(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE TEAM NAME
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Team Logo{" "}
                                </Typography>
                                <form
                                    onSubmit={updateTeamLogo}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="teamLogo"
                                        onChange={onTeamLogoChange}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Font Page Color (Click to open color
                                    picker){" "}
                                </Typography>
                                <ColorPicker
                                    style={{
                                        padding: "5px",
                                        backgroundColor: `${fontValue}`,
                                    }}
                                    name="color"
                                    defaultValue="CLICK HERE"
                                    value={fontValue}
                                    onChange={(color) => updateFont(color)}
                                />
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Team Page Color (Click to open color
                                    picker){" "}
                                </Typography>
                                <ColorPicker
                                    style={{
                                        padding: "5px",
                                        backgroundColor: `${colorValue}`,
                                    }}
                                    name="color"
                                    defaultValue="CLICK HERE"
                                    value={colorValue}
                                    onChange={(color) => updateColor(color)}
                                />
                                
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Abstract{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Project Abstract"
                                    type="text"
                                    value={abstract}
                                    onChange={(e) =>
                                        setAbstract(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateProjectAbstract(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE PROJECT ABSTRACT
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Problem Description{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Problem Description"
                                    type="text"
                                    value={problemDesc}
                                    onChange={(e) =>
                                        setProblemDesc(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateProblemDesc(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE PROBLEM DESCRIPTION
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Solution Description{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Solution Description"
                                    type="text"
                                    value={solutionDesc}
                                    onChange={(e) =>
                                        setSolutionDesc(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateSolutionDesc(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE SOLUTION DESCRIPTION
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Architecture Image{" "}
                                </Typography>
                                <form
                                    onSubmit={updateArchImg}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="architecture"
                                        onChange={onArchImgChange}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Requirements Overview{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Requirements Overview"
                                    type="text"
                                    value={reqOverview}
                                    onChange={(e) =>
                                        setReqOverview(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateReqOverview(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Requirements Overview
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Key Requirements{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Key Requirements"
                                    type="text"
                                    value={keyReq}
                                    onChange={(e) =>
                                        setKeyReq(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateKeyReq(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Key REquirements
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Technology Summary{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Technology Summary"
                                    type="text"
                                    value={techSum}
                                    onChange={(e) =>
                                        setTechSum(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechSum(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology Summary
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Technology 1{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Tech1"
                                    type="text"
                                    value={techName1}
                                    onChange={(e) =>
                                        setTechName1(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechName1(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology 1
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Technology 1 Description{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Technology 1 Description"
                                    type="text"
                                    value={techDes1}
                                    onChange={(e) =>
                                        setTechDes1(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechDes1(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology 1 Description
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Tech 1 Logo{" "}
                                </Typography>
                                <form
                                    onSubmit={updateTechLogo1}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="techLogo1"
                                        onChange={onTechLogo1Change}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Technology 2{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Tech2"
                                    type="text"
                                    value={techName2}
                                    onChange={(e) =>
                                        setTechName2(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechName2(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Tech 2
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Technology 2 Description{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Technology 2 Description"
                                    type="text"
                                    value={techDes2}
                                    onChange={(e) =>
                                        setTechDes2(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechDes2(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology 2 Description
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Tech 2 Logo{" "}
                                </Typography>
                                <form
                                    onSubmit={updateTechLogo2}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="techLogo2"
                                        onChange={onTechLogo2Change}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                                
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Technology 3{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Tech3"
                                    type="text"
                                    value={techName3}
                                    onChange={(e) =>
                                        setTechName3(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechName3(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology 3
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Technology 3 Description{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Technology 3 Description"
                                    type="text"
                                    value={techDes3}
                                    onChange={(e) =>
                                        setTechDes3(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechDes3(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology 3 Description
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Tech 3 Logo{" "}
                                </Typography>
                                <form
                                    onSubmit={updateTechLogo3}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="techLogo3"
                                        onChange={onTechLogo3Change}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Technology 4 {" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Tech4"
                                    type="text"
                                    value={techName4}
                                    onChange={(e) =>
                                        setTechName4(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechName4(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology 4 
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Technology 4 Description{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Technology 4 Description"
                                    type="text"
                                    value={techDes4}
                                    onChange={(e) =>
                                        setTechDes4(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateTechDes4(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Technology 4 Description
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Tech 4 Logo{" "}
                                </Typography>
                                <form
                                    onSubmit={updateTechLogo4}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="techLogo4"
                                        onChange={onTechLogo4Change}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Development Strategy{" "}
                                </Typography>
                                <TextField
                                    style={{ padding: "5px" }}
                                    fullWidth
                                    sx={{ m: 2 }}
                                    label="Development Strategy"
                                    type="text"
                                    value={devStrat}
                                    onChange={(e) =>
                                        setDevStrat(e.target.value)
                                    }
                                />
                                <Button
                                    style={{ padding: "5px" }}
                                    onClick={() =>
                                        updateDevStrat(
                                            teamAssociation[0].team_id
                                        )
                                    }
                                >
                                    UPDATE Development Strategy
                                </Button>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Schedule Image{" "}
                                </Typography>
                                <form
                                    onSubmit={updateSchedImg}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="schedImg"
                                        onChange={onSchedImgChange}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="h6"
                                >
                                    {" "}
                                    Change Backdrop Image{" "}
                                </Typography>
                                <Typography
                                    style={{ padding: "5px" }}
                                    variant="caption"
                                >
                                    {" "}
                                    *Recommended 1920 x 1080{" "}
                                </Typography>
                                <form
                                    onSubmit={updateTeamBackdrop}
                                    encType="multipart/form-data"
                                >
                                    <input
                                        type="file"
                                        accept="images/*"
                                        name="teamBackdrop"
                                        onChange={onTeamBackdropChange}
                                    />
                                    <Button
                                        style={{ padding: "5px" }}
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                </form>
                            </div>
                            <Button
                                sx={{ m: 2 }}
                                variant="contained"
                                color="error"
                                onClick={handleClose}
                            >
                                {" "}
                                Close{" "}
                            </Button>
                        </Box>
                    </Modal>
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
                        <Typography variant="overline">
                            {" "}
                            YOU ARE NOT TEAM LEAD
                        </Typography>
                    </Paper>
                </div>
            );
        }
    } else if (localStorage.getItem('user') == "mentor") {
        // TODO: Implement mentor settings
    }
};

export default Settings;
