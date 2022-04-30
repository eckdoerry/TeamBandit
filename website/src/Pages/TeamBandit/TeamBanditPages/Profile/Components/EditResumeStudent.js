import { useState, React } from "react";

import { toast } from "react-toastify";

import Button from "@mui/material/Button";

const EditResumeStudent = ({ userInfo, setUserChange }) => {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const updateResume = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("avatar", file);

            const myHeaders = new Headers();
            myHeaders.append("token", localStorage.token);

            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/studentResume`,
                { method: "PUT", body: formData, headers: myHeaders }
            );

            toast.success(await response.json());
            setUserChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to update profile picture!");
        }
    };

    const deleteResume = async (e) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/fileuploads/deleteStudentResume`,
                {
                    method: "PUT",
                    headers: { token: localStorage.token },
                }
            );

            const resp = await response.json();

            toast.success(resp);
            setUserChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete profile picture!");
        }
    };

    if (localStorage.getItem("user") == "organizer") {
        return (
            <div>
                <p>error</p>
            </div>
        );
    } else if (localStorage.getItem("user") == "student") {
        return (
            <div>
                <form
                    onSubmit={updateResume}
                    encType="multipart/form-data"
                >
                    <input
                        type="file"
                        accept="images/*"
                        name="avatar"
                        onChange={onFileChange}
                    />
                    <Button type="submit" variant="outlined">
                        Upload
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => deleteResume()}
                    >
                        Delete Current Resume
                    </Button>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <p>ERROR</p>
            </div>
        );
    }
};

export default EditResumeStudent;
