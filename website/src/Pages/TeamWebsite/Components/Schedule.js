import { Fragment, React } from "react";

import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

const Schedule = () => {
    return(
        <div style={{height: '100vh', paddingLeft: '300px', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex',}}>
            <Paper elevation={4} style={{height: '90%', width: '90%'}}>
                <Typography align="center">
                    * INSERT GANTT CHART HERE * 
                </Typography>
            </Paper>
        </div>
    )
}

export default Schedule;