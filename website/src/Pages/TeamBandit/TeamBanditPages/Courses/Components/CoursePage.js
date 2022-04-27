import { Fragment, useState, useEffect, React } from "react";

// MUI Functions
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// CSS
import styles from "../Courses.module.css";

// Routes
import CourseRouter from "../CourseRouter";

const CoursePage = ({ courseInfo, userInfo, userIdentifier, setCoursesChange }) => {

    // ENUM string for routes
    const [route, setRoute] = useState("Projects");

    const [value, setValue] = useState(0);
    const [pages, setPages] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRoute(pages[newValue].page);
    };

    const [state, setState] = useState({
        right: false,
    });

    const anchor = "right";

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const setPageValues = () => {
        
        if( userIdentifier == "organizer" )
        {
            setPages([
                {key: 1, page: "Projects"},
                {key: 2, page: "Schedule"},
                {key: 3, page: "Students"},
                {key: 4, page: "Assignments"},
                {key: 5, page: "Mentors"},
                {key: 6, page: "Settings"}]);
        }
        else if( userIdentifier == "student" )
        {
            setPages([
                {key: 1, page: "Projects"},
                {key: 2, page: "Schedule"}]);
        }
        else if ( userIdentifier == "mentor" )
        {
            // TODO: Set up what pages the mentor should see :)
        }
    };

    useEffect(() => {
        setPageValues();
    }, []);

    return (
        <div>
            <Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                    {courseInfo.course_title.toUpperCase()}
                </Button>
                <Drawer
                    sx={{ zIndex: "modal" }}
                    PaperProps={{ style: { height: "100%", width: "96%" } }}
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    <AppBar
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            background: courseInfo.course_color,
                            alignItems: "center",
                            color: "black",
                            paddingLeft: "50px",
                        }}
                        position="static"
                    >
                        <Button
                            sx={{ mt: 2, mb: 2, mr: 5 }}
                            variant="contained"
                            onClick={toggleDrawer(anchor, false)}
                            startIcon={<ArrowBackIcon />}
                        >
                            {" "}
                            Go Back
                            {" "}
                        </Button>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {courseInfo.course_title.toUpperCase()}
                        </Typography>

                        <Tabs
                            onChange={handleChange}
                            value={value}
                            aria-label="Tabs where selection follows focus"
                            selectionFollowsFocus
                        >
                            {pages.map((page) => (
                                <Tab key={page.key} label={page.page} />
                            ))}
                        </Tabs>
                    </AppBar>

                    {/*This will return whatever page we want displayed :)*/}
                    <CourseRouter
                        route={route}
                        userInfo={userInfo}
                        userIdentifier={userIdentifier}
                        courseInfo={courseInfo}
                        setRoute={setRoute}
                        setCoursesChange={setCoursesChange}
                    />
                </Drawer>
            </Fragment>
        </div>
    );
};

export default CoursePage;
