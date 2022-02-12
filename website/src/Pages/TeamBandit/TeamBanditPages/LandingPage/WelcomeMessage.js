import React, {useEffect, useState} from "react";
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

        <div>
    
            <h1 className='test'>Good {timeOfDay}, {organizerInfo.organizer_fname}!</h1>
    
        </div>
    
    );
    
}

export default WelcomeMessage;