import {Fragment, React} from "react";

import EditPassword from "./Components/EditPassword";

const Settings = ({organizerInfo, setOrganizerChange}) => {
    return(
        <Fragment>
            <h1>Settings</h1>
            <EditPassword organizerInfo={organizerInfo} setOrganizerChange={setOrganizerChange}/>
        </Fragment>
    );
}

export default Settings;
