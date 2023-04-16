import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@material-ui/core";
import fs from 'fs'
import crypto from 'crypto'

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
      //encrypt password before sending 

/*console.log("before pubkey import")
      const publicKey = Buffer.from(
        fs.readFileSync("./pubK.pem", { encoding: "utf-8" })
      );
      console.log("Passed pubkey import") */

      const publicKey = "-----BEGIN PUBLIC KEY-----\n" + 
      "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAx5BEjXULvmiP7N9XFHTs\n"+
      "k95r0Ke4l7saNoR6qUV/deJvanzjPcGweuqFA5M617KXGSuThwxKLMcnkZz4dDqQ\n"+
      "5NQKnvGscoITdcmyjsqFAkAV8m/oWX1GXqWp7GvlRK+nFtr0yI9KiclWlyjngJzz\n"+
      "pYe/3a25+zS0sCZ2qa6cAIv88XIB3a4NLNe8VnYuR2F6jTU9Mb1prkMmc451Ks9U\n"+
      "AuQxL2DSX1Y35hykn+sMR9xeo8TjZTagONVaWs64WoJV/sU3p5L1zjjnV/VvBABs\n"+
      "VkcBWknBg6gOejQXDulR8cG8yJ8fnbfdNdum7tOUHs85zuL6QbPHH7jXyR8Rn8Ee\n"+
      "qEK08jZ5+Kday4tLJeun8hpaqZ45s+Hhopoo7/pSpE1oWGbhhQRYfP8ESxv/ezDD\n"+
      "VAcqjAKWcZNUQsHbCn8XSdHcCfymHjjHasPMFhWYIbC1T4sn7YYZtgFGScn0MSHy\n"+
      "DBeb4/g2zWutpciZSTyvyDmEcpAZ2YdXgbEZbUlyUM7pnsFtvvx0rdyHrRhebc/r\n"+
      "WJ21+TGhZ7KqDXSILYFxxSKHX+xeIpKeEsRuFPutak7cB1e51oSIrx7LCSMW4lh5\n"+
      "Ztn0scmdILOJjTuxFSqUxXIIj2V02S2aZ7XeTgg+o20e47VBg+2OCWGtgILyABnI\n"+
      "j83XKd9vEAa1FwuRIxw5VQkCAwEAAQ==\n"+
      "-----END PUBLIC KEY-----\n"

      const encryptedData = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(password)
      );
      console.log("encypted data: ", encryptedData.toString("base64"));
      const b64dat = encryptedData.toString("base64")
      console.log("Passed encryption")

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
