import { React, useState, useEffect } from "react";

/**
 * Acts as an info page for TeamBandit,
 * may or not be used
 */
const TeamPage = () => {
    const windowValue = window.location.pathname.replace("/team-pages/", "");
    const regExp = /%20/g;
    const team = windowValue.replace(regExp, " ");

    const [teamInfo, setTeamInfo] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const getTeam = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeamInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getTeamMembers = async () => {
        try {

            const teamId = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-name/${team}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const teamIddata = await teamId.json();

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/teams/team-members/${teamIddata[0].team_id}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setTeamMembers(jsonData);
            console.log(teamMembers);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTeam();
        getTeamMembers();
    }, []);

    if (teamInfo[0] != null) {
        return (
            <div style={{ padding: "200px" }}>
                <h1> Team Name: {teamInfo[0].team_name} </h1>
                <h2> Team Size</h2>
                <p> {teamInfo[0].team_size} </p>
                <h2> Team Members </h2>
                {teamMembers.map((teamMember) => (
                    <p key={teamMember.student_id}>{teamMember.student_fname} {teamMember.student_lname}</p>
                ))}
            </div>
        );
    } else {
        return <h1> ERROR TEAM DOES NOT EXIST </h1>;
    }
};

export default TeamPage;
