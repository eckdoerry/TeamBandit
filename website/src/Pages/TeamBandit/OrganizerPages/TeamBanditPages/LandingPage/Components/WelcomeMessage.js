import React from "react";

import { Card, Typography } from "@mui/material";

const WelcomeMessage = ({organizerInfo}) => {

    // Get the current date in real time
    const currentDate = new Date();

    // Extract the hour from the current date
    const hour = currentDate.getHours();

    // Initialize the timeOfDay string to be used in greeting according
    // to the hour of the day
    let timeOfDay;

    // Check for the time of day
    if (hour < 12)
        {
            timeOfDay = "morning";
        }
    else if (hour >= 12 && hour < 18)
        {
            timeOfDay = "afternoon"
        }
    else
        {
            timeOfDay = "evening";
        }
    
    return(
        <div style={{paddingLeft:'25px', paddingRight:'25px'}}>
            <Typography variant="h3"> Good {timeOfDay}, {organizerInfo.organizer_fname}! </Typography>
            <p style={{borderBottom: '5px solid black'}}></p>
        </div>
    );  
}

export default WelcomeMessage;