import { React, useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TeamBanditLogo from "../../Images/logo.png";

const theme = createTheme();

const ProfilePage = () => {
    const windowValue = window.location.hash.replace(
        "#/organizer-profile/",
        ""
    );
    const regExp = /%20/g;
    const windowString = windowValue.replace(regExp, " ");

    const [organizerInfo, setorganizerInfo] = useState([]);
    const [courses, setCourses] = useState([]);

    const getStudent = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/org-profile/${windowString}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            const courseRes = await fetch(
                `${process.env.REACT_APP_BASEURL}/courses/organizer-courses/${windowString}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const courseData = await courseRes.json();

            setCourses(courseData);

            setorganizerInfo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getStudent();
        document.title = "Organizer Profile";
    }, []);
    console.log(courses);
    if (organizerInfo.length > 0) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    width: "100%",
                }}
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar
                        style={{ backgroundColor: `#002454` }}
                        position="relative"
                    >
                        <Toolbar style={{ backgroundColor: `#002454` }}>
                            <Typography variant="h6" color="inherit" noWrap>
                                TeamBandit
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <div style={{ display: "flex", width: "100%", height: "100%" }}>
                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={
                                organizerInfo[0].profilepic_filepath != null
                                    ? process.env.PUBLIC_URL +
                                      "/uploads/images/profilePictures/" +
                                      organizerInfo.profilepic_filepath
                                    : process.env.PUBLIC_URL +
                                      "/uploads/images/profilePictures/default.jpg"
                            }
                            alt=""
                            width="500px"
                            height="500px"
                        />

                        <Typography
                            variant="h2"
                            align="center"
                            color="text.secondary"
                        >
                            {organizerInfo[0].organizer_fname}{" "}
                            {organizerInfo[0].organizer_lname}
                        </Typography>
                    </div>
                    <div style={{ height: "100%", width: "100%" }}>
                    <Typography variant="h4">Public Courses</Typography>
                        <TableContainer
                            style={{ width: "100%", height: "100%" }}
                            component={Paper}
                        >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{backgroundColor: '#002454', color: 'white'}}>Course Name</TableCell>
                                        <TableCell style={{backgroundColor: '#002454', color: 'white'}}>Course Semester</TableCell>
                                        <TableCell style={{backgroundColor: '#002454', color: 'white'}}>Course Year</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courses.length == 0 ||
                                    courses[0].course_id == null
                                        ? null
                                        : courses.map((course) => (
                                            course.course_public ? 
                                              <TableRow
                                                  key={course.course_id}
                                                  sx={{
                                                      "&:last-child td, &:last-child th":
                                                          { border: 0 },
                                                  }}
                                              >
                                                  <TableCell
                                                      component="th"
                                                      scope="row"
                                                      style={{
                                                          borderRight:
                                                              "1px solid #d3d3d3",
                                                      }}
                                                  >
                                                      <Link
                                                          target="_blank"
                                                          style={{
                                                              textDecoration:
                                                                  "none",
                                                          }}
                                                          to={`/team-page/${course.course_id}`}
                                                      >
                                                          {" "}
                                                          <Typography
                                                              variant="body1"
                                                              style={{
                                                                  fontWeight:
                                                                      "bold",
                                                              }}
                                                          >
                                                              {
                                                                  course.course_title
                                                              }
                                                          </Typography>
                                                      </Link>
                                                  </TableCell>
                                                  <TableCell
                                                      style={{
                                                            borderRight:
                                                              "1px solid #d3d3d3",
                                                      }}
                                                  >
                                                      {course.course_semester}
                                                  </TableCell>
                                                  <TableCell
                                                      style={{
                                                          borderRight:
                                                              "1px solid #d3d3d3",
                                                      }}
                                                  >
                                                      {course.course_year}
                                                  </TableCell>
                                              </TableRow> : null
                                          ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar
                        style={{ backgroundColor: `#002454` }}
                        position="relative"
                    >
                        <Toolbar style={{ backgroundColor: `#002454` }}>
                            <Typography variant="h6" color="inherit" noWrap>
                                TeamBandit
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <Typography
                    variant="h1"
                    style={{
                        color: "#002454",
                        textShadow: "1px 1px 2px black",
                    }}
                >
                    {" "}
                    404{" "}
                </Typography>
                <Typography
                    variant="h4"
                    style={{
                        color: "#FAC01A",
                        textShadow: "1px 1px 2px black",
                    }}
                >
                    {" "}
                    This Student Does Not Exist{" "}
                </Typography>

                <img
                    src={TeamBanditLogo}
                    alt="Logo"
                    width="250px"
                    height="250px"
                />
                <Link to="/">
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#002454" }}
                    >
                        {" "}
                        GO BACK TO HOME PAGE{" "}
                    </Button>
                </Link>
            </div>
        );
    }
};

export default ProfilePage;
