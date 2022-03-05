import { Fragment, useState, React } from "react";

// MUI Functions
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// CSS
import styles from "../Courses.module.css";

// Routes
import CourseRouter from "../CourseRouter";

// Table of the contents
const pages = [
    "Homepage",
    "Schedule",
    "Info and Policies",
    "Projects",
    "Teams",
    "Assignments",
];

const CoursePage = ({ studentInfo, courseInfo, setCoursesChange }) => {
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

    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // ENUM string for routes
    const [route, setRoute] = useState("Homepage");

    return (
        <div>
            <Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                    {courseInfo.course_title}
                </Button>
                <Drawer
                    sx={{ zIndex: "modal" }}
                    PaperProps={{ style: { height: "100%", width: "96%" } }}
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    <AppBar
                        style={{ background: "#FAC01A", color: "black" }}
                        position="static"
                    >
                        <Container
                            maxWidth="xl"
                            sx={{ display: "flex", flexDirection: "row" }}
                        >
                            <Button
                                sx={{ mt: 2, mb: 2, mr: 5}}
                                variant="contained"
                                onClick={toggleDrawer(anchor, false)}
                                startIcon={<ArrowBackIcon />}
                            >
                                {" "}
                                Go Back{" "}
                            </Button>
                            <Toolbar disableGutters>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{
                                        mr: 2,
                                        display: { xs: "none", md: "flex" },
                                    }}
                                >
                                    {courseInfo.course_title}
                                </Typography>

                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: { xs: "flex", md: "none" },
                                    }}
                                >
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "left",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            display: {
                                                xs: "block",
                                                md: "none",
                                            },
                                        }}
                                    >
                                        {pages.map((page) => (
                                            <MenuItem
                                                key={page}
                                                onClick={() => {
                                                    handleCloseNavMenu();
                                                    setRoute({ page });
                                                }}
                                            >
                                                <Typography textAlign="center">
                                                    {page}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    {courseInfo.course_title}
                                </Box>

                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: { xs: "none", md: "flex" },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <Button
                                            className={styles.changeFont}
                                            key={page}
                                            onClick={() => {
                                                handleCloseNavMenu();
                                                setRoute({ page });
                                            }}
                                            sx={{
                                                my: 2,
                                                color: "white",
                                                display: "block",
                                            }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>

                    {/*This will return whatever page we want displayed :)*/}
                    <CourseRouter
                        route={route}
                        studentInfo={studentInfo}
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
