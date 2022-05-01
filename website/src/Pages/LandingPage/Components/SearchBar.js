import {React, useState, useEffect} from 'react'
import styles from "../LandingPage.module.css";

const SearchBar = () => {

    const [organizerData, setOrganizerData] = useState([]);
    const [query, setQuery] = useState("");

    const getOrganizerData = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/general/organizers/${0}`,
                { method: "GET", headers: { token: localStorage.token } }
            );

            setOrganizerData(await response.json())
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getOrganizerData();
    }, []);

    return (
        <div className={styles.searchBar}>
            <input placeholder="Enter Organizer Name" onChange={event => setQuery(event.target.value)}/>
            {
                organizerData.filter(result => {
                    var organizer_full_name = result.organizer_fname + " " + result.organizer_lname;
                    if (query === '') {
                        return false;
                    } 
                    else if (organizer_full_name.trim().replace(" ", "").toLowerCase().includes(query.toLowerCase().trim().replace(" ", ""))) {
                        return true;
                    }
                    else if (result.organizer_fname.toLowerCase().includes(query.toLowerCase().trim().replace(" ", ""))) {
                        return true;
                    }
                    else if (result.organizer_lname.toLowerCase().includes(query.toLowerCase().trim().replace(" ", ""))) {
                        return true;
                    }
                    return false;
                }).map((result, index) => (
                    <div key={index}>
                        <p>{result.organizer_fname + " " + result.organizer_lname}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchBar