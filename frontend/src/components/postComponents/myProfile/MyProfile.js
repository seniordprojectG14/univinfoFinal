import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@material-ui/core";
const MyProfile = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [newNickName, setNickName] = useState();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState();

  const updateHandler = async () => {
 
    toast({
      title: "Profile Updated",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("On Click");
    const { data } = await axios.patch(
      "/api/user",
      {newNickName,
      email,
      password},
      config
    );
  };


  

  return (
    <div>
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="New Nickname"
        variant="standard"
        onChange={(e) => setNickName(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="New Email"
        variant="standard"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="New Password"
        variant="standard"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box m={2} pt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={updateHandler}
        >
          Update Profile
        </Button>
      </Box>
    </div>
  );
};
export default MyProfile;
