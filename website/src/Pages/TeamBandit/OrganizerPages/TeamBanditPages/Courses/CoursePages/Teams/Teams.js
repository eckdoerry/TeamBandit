import {React} from "react";

// Page Components
import TeamsList from './Components/TeamsList';

const Teams = ({courseInfo}) => {
    return(
        <TeamsList courseInfo={courseInfo}/>
    );
}

export default Teams;