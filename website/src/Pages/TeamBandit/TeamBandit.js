import React, { Fragment, useState, useEffect } from "react";
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
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";

// DRAWER FUNCTIONS
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

const settings = ["Profile", "Logout"];

export default function MiniDrawer({ setAuth }) {

    const [organizerInfo, setOrganizerInfo] = useState([]);
    const [organizerChange, setOrganizerChange] = useState(false);

    // Updates Page
    useEffect(() => {
        const getOrganizer = async () => {
            try {
                const response = await fetch("http://localhost:5000/general/", {method: "GET", headers: {token: localStorage.token}});
    
                const parseData = await response.json();
    
                setOrganizerInfo(parseData);
                console.log(organizerInfo);
    
            } catch (error) {
                console.error(error.message);
            }
        }
        getOrganizer();
        setOrganizerChange(false);
    }, [organizerChange]);

    // JS
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    // ENUM string for routes
    const [route, setRoute] = useState("Home");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
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

                    <Box sx={{ flexGrow: 1 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                className={styles.avatar}
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt={organizerInfo.organizer_fname}
                                    src="/static/images/avatar/2.jpg"
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
                    {["Home", "Email Hub", "Clients", "Courses"].map(
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
                                    {index === 0 ? (
                                        <Tooltip
                                            title="Home"
                                            placement="right"
                                            arrow
                                        >
                                            <HomeIcon />
                                        </Tooltip>
                                    ) : index === 1 ? (
                                        <Tooltip
                                            title="Emails"
                                            placement="right"
                                            arrow
                                        >
                                            <InboxIcon />
                                        </Tooltip>
                                    ) : index === 2 ? (
                                        <Tooltip
                                            title="Clients"
                                            placement="right"
                                            arrow
                                        >
                                            <PeopleIcon />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip
                                            title="Courses"
                                            placement="right"
                                            arrow
                                        >
                                            <SchoolIcon />
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
                <TeamBanditRoutes route={route} organizerInfo={organizerInfo}/>

                <footer className={styles.footer}>
                    {" "}
                    Copyright @ 2022 All Rights Reserved{" "}
                </footer>
            </Box>
        </Box>
    );
}
