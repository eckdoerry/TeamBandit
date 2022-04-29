import { Fragment, React } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Schedule = () => {
    return (
        <div
            style={{
                height: "100vh",
                paddingLeft: "300px",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Paper elevation={4} style={{ height: "75%", width: "90%" }}>
                <img
                    src="https://source.unsplash.com/random/304x150"
                    alt="Example4"
                    style={{
                        padding: "5px",
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                    }}
                />
            </Paper>
            <div
                style={{
                    height: "20%",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                <Typography variant="h3" align="center">
                    Our Development Strategy
                </Typography>
                <Typography variant="body1" align="center">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..", comes from a line in section
                    1.10.32.
                </Typography>
            </div>
        </div>
    );
};

export default Schedule;
