/**
 * @Author Carter Taylor 
 */
import React from "react";
import { useState, useEffect, useReducer, useRef} from "react";
import { Search, Grid } from "semantic-ui-react";

// DEPENDENCIES: semantic-ui-react semantic-ui-css

import 'semantic-ui-css/semantic.min.css' // Import this at the head of your index.js file

import axios from "axios";

// Example of the format the search component expects for data
    // Whatever you fetch from your database, make it match this format
const sourceExample = [
    {
        key:1,
        title:"Bob Dylan",
        description: "bobby123@nau.edu"
    },
    {
        key:2,
        title:"Quinn Melssen",
        description: "qjm7@nau.edu"
    }
]

// TODO: Put in your own data retreival route
const routeURL = ""; 

// Initial state of search bar   
const initialState = {
    loading: false, 
    results: [], // Display results
    value: "", // current search letters in search bar
};

// TODO: Move Reducer to other redux files
function exampleReducer(state, action) {
    switch (action.type) {
        case "CLEAN_QUERY":
            return initialState;
        case "START_SEARCH":
            return { ...state, loading: true, value: action.query };
        case "FINISH_SEARCH":
            return { ...state, loading: false, results: action.results };
        case "UPDATE_SELECTION":
            return { ...state, value: action.selection };

        default:
            throw new Error();
    }
}


// Component displays autocomplete search bar that reacts based on the given "source"
function SearchExampleStandard() {

    // Redux stuff
    const [state, dispatch] = useReducer(exampleReducer, initialState);
    const { loading, results, value } = state;

    const timeoutRef = useRef();

    // state for source
    let [source, setSource] = useState(sourceExample) 

    function handleSearchChange(e)
    {

        // Grab typed letters
        let typedLetters =  e.target.value

        // Initiate search, set the search letters to "value" of searh bar 
        dispatch({ type: "START_SEARCH", query: typedLetters});

        // Clear out search after a timeout 
        timeoutRef.current = setTimeout(() => { 
            // If we received no letters, clear the search
            if (e.target.value.length === 0) {
                dispatch({ type: "CLEAN_QUERY" });
                return;
            }

            // TODO: Change your function to be grabbing whatever you need!
            grabUsers(e.target.value)


        }, 300); // 3 ms timeout

    }

    // Function retrieves list of users and adds that list to state of source data
    const grabUsers = (searchLetters) => {
        // Retreive 
        axios
            .post(routeURL, {
                data:searchLetters,
            })
            .then((response) => {

                // Set source data to what was retreived

                // TODO: Make sure response matches format of "sourceExample"  
                setSource(response)

            });
    }

    // Clear after timeout
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    // After state is updated, finish the search
    useEffect(() => {
        dispatch({
            type: "FINISH_SEARCH",
            results: source, // Filter for match, and  save it to store
        });
    }, [source]);

    return (
        <Grid>
            <Grid.Column width={6}>
                <Search
                    loading={loading}
                    placeholder="Search..."
                    onResultSelect={(e, data) =>
                            {
                                // RENDER OTHER FILTER COMPONENTS based on selection (call prop function back)
                                console.log(data) 
                                dispatch({
                                    type: "UPDATE_SELECTION",
                                    selection: data.result.title,
                                })
                        }
                    }
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                />
            </Grid.Column>

        </Grid>
    );
}

export default SearchExampleStandard;