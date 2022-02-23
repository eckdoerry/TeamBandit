import {useState, React} from 'react';

import { toast } from 'react-toastify';

import Button from '@mui/material/Button';

const EditProfilePicture = ({studentInfo, setStudentChange}) => {
  const [file, setFile] = useState(null);
  
  const onFileChange = (e) => {
    setFile(e.target.files[0]); 
  }

    const updateProfilePicture = async e => {
      e.preventDefault();
      try {
          const formData = new FormData();
          formData.append("avatar", file);

          const myHeaders = new Headers();
          myHeaders.append("token", localStorage.token);

          const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/studentAvatar`, {method: "PUT", body: formData, headers: myHeaders});

          toast.success(await response.json());
          setStudentChange(true);
      } catch (error) {
          console.error(error.message);
          toast.error("Failed to update profile picture!");
      }
    };

    const deleteProfilePicture = async (id) => {
      try {

        const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/deleteStudentProfilePicture/${id}`, {
              method: "PUT",
              headers: { token: localStorage.token }
          });

          const resp = await response.json();

          toast.success(resp);
          setStudentChange(true);
      } catch (error) {
          console.error(error.message);
          toast.error("Failed to delete profile picture!");
      }
    };

    return (
      <div>
        <form onSubmit={updateProfilePicture} encType="multipart/form-data">
          <input type="file" accept="images/*" name="avatar" onChange={onFileChange}/>
          <Button type="submit" variant="outlined">Upload</Button>
          <Button variant="outlined" onClick={() => deleteProfilePicture(studentInfo.student_id)}>Delete Current Profile Picture</Button>
        </form>
      </div>
    );
}

export default EditProfilePicture