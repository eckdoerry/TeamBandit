import { React, useState, useEffect } from "react";
import styles from "../LandingPage.module.css";

import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
    const [organizerData, setOrganizerData] = useState([]);
    const [query, setQuery] = useState("");

    var noResults = false;

    const getOrganizerData = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/organizers/${0}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            setOrganizerData(await response.json());
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getOrganizerData();

        // Was getting unmounted component warning in console
        // when refreshing the page with a valid JWT
            // this fixes it
        return () => {
            setOrganizerData([]);
            setQuery("");
          };
    }, []);

    return (
        <div className={styles.searchBar} >
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: '100%',
                }}
            >
                <InputBase
                    fullWidth
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search TeamBandit Organizers"
                    onChange={(event) => setQuery(event.target.value)}
                    inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                    sx={{ p: "10px" }}
                    aria-label="search"
                    disabled
                >
                    <SearchIcon />
                </IconButton>
                
            </Paper>
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "left",
                    width: '100%',
                }}
            >
                {organizerData
                    .filter((result) => {
                        var organizer_full_name =
                            result.organizer_fname + " " + result.organizer_lname;
                        if (query === "") {
                            return false;
                        } else if (
                            organizer_full_name
                                .trim()
                                .replace(" ", "")
                                .toLowerCase()
                                .includes(
                                    query.toLowerCase().trim().replace(" ", "")
                                )
                        ) {
                            return true;
                        } else if (
                            result.organizer_fname
                                .toLowerCase()
                                .includes(
                                    query.toLowerCase().trim().replace(" ", "")
                                )
                        ) {
                            return true;
                        } else if (
                            result.organizer_lname
                                .toLowerCase()
                                .includes(
                                    query.toLowerCase().trim().replace(" ", "")
                                )
                        ) {
                            return true;
                        }
                        noResults = true;
                        return true;
                    }).map((result, index) => (
                        <div key={index} style={{borderBottom: '1px solid #d3d3d3', paddingTop: '10px'}}>
                        {
                            noResults ? <Typography gutterBottom variant="h6">
                                No Results
                            </Typography>
                        :
                            <Link
                            style={{textDecoration: 'none'}}
                                target="_blank"
                                to={`/organizer-profile/${result.organizer_id}`}
                            >
                                {" "}
                                <Typography gutterBottom variant="h6">
                                {result.organizer_fname +
                                        " " +
                                        result.organizer_lname}
                                </Typography>
                            </Link>}
                        </div>
                    ))}
                </Paper>
        </div>
    );
};

export default SearchBar;
