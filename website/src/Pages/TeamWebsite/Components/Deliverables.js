import { React } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router-dom";

const Deliverables = ({ colorValue, fontColor }) => {
    return (
        <div
            style={{
                height: "100vh",
                paddingLeft: "300px",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexFlow: "column",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    padding: "10px",
                }}
            >
                <Typography style={{ height: "10%" }} variant="h2">
                    {" "}
                    Documentation
                </Typography>
                <TableContainer style={{ height: "90%" }} component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    style={{
                                        backgroundColor: `${colorValue}`,
                                        color: `${fontColor}`,
                                        fontSize: "large",
                                    }}
                                >
                                    Title
                                </TableCell>
                                <TableCell
                                    style={{
                                        backgroundColor: `${colorValue}`,
                                        color: `${fontColor}`,
                                        fontSize: "large",
                                    }}
                                    align="center"
                                >
                                    Date
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    {" "}
                                    <Link
                                        target="_blank"
                                        to={`/team-website/`}
                                    >
                                        {" "}
                                        <Typography variant="h5">
                                            Peer Evaluation # 1
                                        </Typography>
                                    </Link>{" "}
                                </TableCell>
                                <TableCell align="center"> <Typography variant="h5">
                                            02/13/22
                                        </Typography> </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                <Link
                                        target="_blank"
                                        to={`/team-website/`}
                                    >
                                        {" "}
                                        <Typography variant="h5">
                                            Peer Evaluation # 1
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell align="center"><Typography variant="h5">
                                            02/13/22
                                        </Typography>  </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                <Link
                                        target="_blank"
                                        to={`/team-website/`}
                                    >
                                        {" "}
                                        <Typography variant="h5">
                                            Peer Evaluation # 1
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell align="center"><Typography variant="h5">
                                            02/13/22
                                        </Typography>  </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                <Link
                                        target="_blank"
                                        to={`/team-website/`}
                                    >
                                        {" "}
                                        <Typography variant="h5">
                                            Peer Evaluation # 1
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell align="center"> <Typography variant="h5">
                                            02/13/22
                                        </Typography>  </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                <Link
                                        target="_blank"
                                        to={`/team-website/`}
                                    >
                                        {" "}
                                        <Typography variant="h5">
                                            Peer Evaluation # 1
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell align="center"> <Typography variant="h5">
                                            02/13/22
                                        </Typography>  </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                <Link
                                        target="_blank"
                                        to={`/team-website/`}
                                    >
                                        {" "}
                                        <Typography variant="h5">
                                            Peer Evaluation # 1
                                        </Typography>
                                    </Link>
                                </TableCell>
                                <TableCell align="center"> <Typography variant="h5">
                                            02/13/22
                                        </Typography>  </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Deliverables;
