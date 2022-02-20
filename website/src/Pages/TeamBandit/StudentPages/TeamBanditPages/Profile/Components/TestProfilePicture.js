import {useState, React} from 'react';

import { toast } from 'react-toastify';

import Button from '@mui/material/Button';

const TestProfilePicture = ({setStudentChange}) => {
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

    return (
      <div>
        <form onSubmit={updateProfilePicture} encType="multipart/form-data">
          <Button variant="outlined">
            <input type="file" name="avatar" onChange={onFileChange}/>
            
            <br />
            <br />
            <br />
          </Button>

          <br />

          <br />

          <br />

          <Button type="submit" variant="outlined">Upload</Button>
        </form>
      </div>
    );
}

export default TestProfilePicture