import { Fragment, React } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';

const Solution = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100%",
                paddingLeft: "300px",
                backgroundColor: "white",
                display: "flex",
                flexFlow: "row",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <Paper elevation={4} style={{margin: '50px', height: '90%'}}>

                </Paper>
                
            </div>
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Lorem Ipsum Dolar Solarious
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
            </div>
            <div
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <Paper elevation={4} style={{margin: '50px', height: '90%'}}>

                </Paper>
            </div>
        </div>
    );
};

export default Solution;
