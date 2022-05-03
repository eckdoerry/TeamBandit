import React, { useState, useEffect, Fragment } from "react";
import { toast } from "react-toastify";
import styles from "./TeamBandit.module.css";

// Pages
import TeamBanditRoutes from "./TeamBanditRoutes";

// MUI imports
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import SchoolIcon from "@mui/icons-material/School";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

// DRAWER FUNCTIONS //
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

// END DRAWER FUNCTIONS //

export default function MainPage({ userIdentifier, setAuth }) {

    const [settings, setSettings] = useState(["Profile", "Logout"]);
    const [sideBar, setSideBar] = useState([]);

    // JS
    const theme = useTheme();

    // start with drawer open by default, closes upon first use
    const [open, setOpen] = useState(true);

    const [anchorElUser, setAnchorElUser] = useState(null);

    // ENUM string for routes
    const [route, setRoute] = useState("Courses");

    const [userInfo, setUserInfo] = useState([]);
    const [userChange, setUserChange] = useState(false);

    // Organizer Statistics
    const [courses, setCourses] = useState([]);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [students, setStudents] = useState([]);
    
    // Flag to keep track of drawer initial open state upon login
    const [drawerInitialized, setDrawerInitialized] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setDrawerInitialized(true);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const getUser = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/${userIdentifier}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const parseData = await response.json();
            setUserInfo(parseData);

        } catch (error) {
            console.error(error.message);
        }
    };

    const getStatistics = async () => {
        if (userIdentifier != "organizer") {
            return;
        }
        try {
            const courseTotal = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/course-total/${userIdentifier}`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            
            const clientTotal = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/client-total/${userIdentifier}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const projectTotal = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/project-total/${userIdentifier}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const studentTotal = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/student-total/${userIdentifier}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            const courseData = await courseTotal.json();
            const clientData = await clientTotal.json();
            const projectData = await projectTotal.json();
            const studentData = await studentTotal.json();
            
            setCourses(courseData);
            setClients(clientData);
            setProjects(projectData);
            setStudents(studentData); 
        } catch (error) {
            toast.error("Unable to load statistic information.");
            console.error(error.message);
        }
    };

    const determineSideBar = () => {
        if (userIdentifier == "organizer") {
            setSideBar(["Courses", "Clients", "Email Hub"]);
        } else if (userIdentifier == "student") {
            setSideBar(["Courses"]);
        } else if (userIdentifier == "mentor") {
            //TODO: Add mentor sidebar
        }
    };

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("identifier");
        setAuth(false);
        toast.success("Logged out successfully!");
    };

    useEffect(() => {
        getStatistics();
        getUser();
        determineSideBar();
        setUserChange(false);
    }, [userChange]);

    // JSX
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar sx={{ background: "#002454" }} position="fixed" open={open}>
                <Toolbar className={styles.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: "36px",
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        TeamBandit
                    </Typography>
                    {userIdentifier == "organizer" && (
                        <Fragment>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "25px",
                                    opacity: "0.35",
                                }}
                            >
                                <SchoolIcon />
                                <Typography variant="h8" noWrap>
                                    Total Courses:
                                </Typography>
                                <Typography variant="h8" noWrap>
                                    {courses.length}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "25px",
                                    opacity: "0.35",
                                }}
                            >
                                <AccountBoxIcon />
                                <Typography variant="h8" noWrap>
                                    Total Clients:
                                </Typography>
                                <Typography variant="h8" noWrap>
                                    {clients.length}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "25px",
                                    opacity: "0.35",
                                }}
                            >
                                <ContentPasteIcon />
                                <Typography variant="h8" noWrap>
                                    Total Projects:
                                </Typography>
                                <Typography variant="h8" noWrap>
                                    {projects.length}
                                </Typography>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "25px",
                                    opacity: "0.35",
                                }}
                            >
                                <PeopleIcon />
                                <Typography variant="h8" noWrap>
                                    Total Students:
                                </Typography>
                                <Typography variant="h8" noWrap>
                                    {students.length}
                                </Typography>
                            </div>
                        </Fragment>
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                className={styles.avatar}
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={
                                        userIdentifier == "organizer"
                                            ? userInfo.organizer_fname
                                            : userIdentifier == "student"
                                            ? userInfo.student_fname
                                            : userInfo.mentor_fname
                                    }
                                    src={
                                        process.env.PUBLIC_URL + "/uploads/images/profilePictures/" +
                                        userInfo.profilepic_filepath
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        {userIdentifier == "organizer" ? 
                        <MenuItem> {userInfo.organizer_fname} {userInfo.organizer_lname} - Organizer</MenuItem> : userIdentifier == "student" ? 
                        <MenuItem> {userInfo.student_fname} {userInfo.student_lname} - Student</MenuItem> : userIdentifier == "mentor" ?
                        <MenuItem> {userInfo.mentor_fname} {userInfo.mentor_lname} - Mentor </MenuItem> : null
                    }
                        <Divider />
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={(event) =>
                                        setting !== "Logout"
                                            ? (handleCloseUserMenu(),
                                                setRoute({ setting }))
                                            : logout(event)
                                    }
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton
                            color="inherit"
                            className={styles.avatar}
                            onClick={() => {
                                setRoute("Settings");
                            }}
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{ zIndex: 0 }}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideBar.map((text, index) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => {
                                setRoute({ text });
                                handleDrawerClose();
                            }}
                        >
                            <ListItemIcon>
                                {index === 4 ? (
                                    <Tooltip
                                        title="Home"
                                        placement="right"
                                        arrow
                                    >
                                        <HomeIcon />
                                    </Tooltip>
                                ) : index === 0 ? (
                                    <Tooltip
                                        title="Courses"
                                        placement="right"
                                        arrow
                                    >
                                        <SchoolIcon />
                                    </Tooltip>
                                ) : index === 1 ? (
                                    <Tooltip
                                        title="Clients"
                                        placement="right"
                                        arrow
                                    >
                                        <PeopleIcon />
                                    </Tooltip>
                                ) : (
                                    <Tooltip
                                        title="Emails"
                                        placement="right"
                                        arrow
                                    >
                                        <InboxIcon />
                                    </Tooltip>
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem
                        button
                        key="Logout"
                        onClick={(event) => logout(event)}
                    >
                        <ListItemIcon>
                            <Tooltip title="Logout" arrow>
                                <LogoutIcon />
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <TeamBanditRoutes
                    route={route}
                    userInfo={userInfo}
                    userIdentifier={userIdentifier}
                    setUserChange={setUserChange}
                />
                <footer className={styles.footer}>
                    {" "}
                    Copyright @ 2022 All Rights Reserved{" "}
                </footer>
            </Box>
        </Box>
    );
}
