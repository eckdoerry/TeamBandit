import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TeamBanditRoutes from "./TeamBanditRoutes";
import styles from "./TeamBandit.module.css";

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

const settings = ["Profile", "Logout"];

export default function MiniDrawer({ setAuth }) {

    const [organizerInfo, setOrganizerInfo] = useState([]);
    const [organizerChange, setOrganizerChange] = useState(false);

    const [courses, setCourses] = useState([]);
    const [clients, setClients] = useState([]);
    const [projects, setProjects] = useState([]);
    const [students, setStudents] = useState([]);

    const getOrganizer = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/general/`, {method: "GET", headers: {token: localStorage.token}});

            const parseData = await response.json();

            setOrganizerInfo(parseData);

        } catch (error) {
            console.error(error.message);
        }
    }

    const getCourses = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/course-total/`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setCourses(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getClients = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/client-total/`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setClients(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getProjects = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/project-total/`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setProjects(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getStudents = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/student-total/`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setStudents(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        
        getOrganizer();
        getCourses();
        getClients();
        getProjects();
        getStudents();
        setOrganizerChange(false);
    }, [organizerChange]);

    // JS
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    // ENUM string for routes
    const [route, setRoute] = useState("Courses");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("identifier");
        setAuth(false);
        toast.success("Logged out successfully!");
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // JSX
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                sx={{ background: "#002454" }}
                position="fixed"
                open={open}
            >
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
                    <div style={{display:'flex', alignItems:'center', paddingLeft:'25px', opacity:'0.35'}}>
                    <SchoolIcon />
                    <Typography variant="h8" noWrap >
                        Total Courses:
                    </Typography>
                    <Typography variant="h8" noWrap >
                        {courses.length}
                    </Typography>
                    </div>
                    <div style={{display:'flex', alignItems:'center', paddingLeft:'25px', opacity:'0.35'}}>
                    <AccountBoxIcon />
                    <Typography variant="h8" noWrap >
                        Total Clients:
                    </Typography>
                    <Typography variant="h8" noWrap >
                        {clients.length}
                    </Typography>
                    </div>
                    <div style={{display:'flex', alignItems:'center', paddingLeft:'25px', opacity:'0.35'}}>
                    <ContentPasteIcon />
                    <Typography variant="h8" noWrap >
                        Total Projects:
                    </Typography>
                    <Typography variant="h8" noWrap >
                        {projects.length}
                    </Typography>
                    </div>
                    <div style={{display:'flex', alignItems:'center', paddingLeft:'25px', opacity:'0.35'}}>
                    <PeopleIcon />
                    <Typography variant="h8" noWrap >
                        Total Students:
                    </Typography>
                    <Typography variant="h8" noWrap >
                        {students.length}
                    </Typography>
                    </div>

                    <Box sx={{ flexGrow: 1 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                className={styles.avatar}
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={organizerInfo.student_fname}
                                    src={"/uploads/images/profilePictures/" + organizerInfo.profilepic_filepath}
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
            <Drawer variant="permanent" open={open} sx={{zIndex: 0}}>
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
                    {["Courses", "Clients", "Email Hub"].map(
                        (text, index) => (
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
                        )
                    )}
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
                <TeamBanditRoutes route={route} organizerInfo={organizerInfo} setOrganizerChange={setOrganizerChange}/>

                <footer className={styles.footer}>
                    {" "}
                    Copyright @ 2022 All Rights Reserved{" "}
                </footer>
            </Box>
        </Box>
    );
}
