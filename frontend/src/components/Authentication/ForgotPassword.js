import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@material-ui/core";
const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();


  const onSubmit = async () => {

    if(!username || !email)
    {
      toast({
        title: "Please, enter all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("On Click");

    try{
    const { data } = await axios.patch(
      "/api/user/ForgotPassword",
      {username},
      config
    );

    toast({
      title: "Email send, check your account email",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    }catch
    {
      toast({
        title: "User does not exist",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

    }

    
  }

  return (
    <div>
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="Username"
        variant="standard"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        required
        id="outlined-basic"
        label="Email"
        variant="standard"
        type="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Box m={2} pt={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSubmit}
        >
         Summit
        </Button>
      </Box>
    </div>
  );
};

export default ForgotPassword;
