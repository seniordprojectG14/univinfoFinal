import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@material-ui/core";
const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async () => {
    if (!name || !username || !password || !confirmpassword) {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          username,
          password,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/blog");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <div>
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="Username"
        variant="standard"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="Name"
        variant="standard"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="Password"
        variant="standard"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="Confirm Password"
        variant="standard"
        type="password"
        onChange={(e) => setConfirmpassword(e.target.value)}
      />
      <Box m={2} pt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default Signup;
