import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import signContext from "../stores/sign-context";
import snackbarContext from "../stores/snackbar-context";
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, TextField,
} from "@mui/material";

function SignIn() {
  const signCtx = useContext(signContext);
  const sbCtx = useContext(snackbarContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setValidations({});
    setShowPassword(false);
    setDisableButton(false);
  }, [signCtx.signIn]);

  const validate = () => {
    let validations = {
      username: false,
      password: false
    };
    let ok = true;
    if (username.length === 0) {
      validations.username = true;
      ok = false;
    }
    if (password.length < 8) {
      validations.password = true;
      ok = false;
    }
    setValidations(validations);
    return ok;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setDisableButton(true);
      axios
        .post("/sign-in", {
          username: username,
          password: password
        })
        .then((res) => {
          localStorage.setItem("token", res.data["token"]);
          localStorage.setItem("username", username);
          window.location.reload();
        })
        .catch((err) => {
          switch (err.response.data["message"]) {
            case "wrong password":
              setValidations({passwordWrong: true}); break;
            case "username not exist":
              setValidations({usernameWrong: true}); break;
            default:
              sbCtx.onSnackbar("Something wrong! Please try again!", "error");
          }
          setDisableButton(false);
        });
    }
  }

  return (
    <Dialog open={signCtx.signIn} onClose={signCtx.onNothing}>
      <DialogTitle sx={styles.title}>
        Sign in
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormControl sx={styles.form}>
            <TextField id="username" label="Username" type="text" variant="standard"
                       fullWidth sx={styles.input} autoFocus error={validations.username || validations.usernameWrong}
                       helperText={validations.username ? "Username can't be blank!" :
                         validations.usernameWrong ? "Username does not exist!" : ""}
                       onChange={(e) => setUsername(e.currentTarget.value)}/>

            <TextField id="password" label="Password" type={showPassword ? "text" : "password"} variant="standard"
                       fullWidth sx={styles.input} error={validations.password || validations.passwordWrong}
                       helperText={validations.password ? "Password can't have less than 8 characters!" :
                         validations.passwordWrong ? "Wrong password!" : ""}
                       onChange={(e) => setPassword(e.currentTarget.value)}/>

            <FormControlLabel control={<Checkbox/>} label="Show password" checked={showPassword}
                              onChange={(e) => setShowPassword(e.currentTarget.checked)}/>

            <Button disabled={disableButton} variant="contained" color="success" sx={styles.button} type="submit">
              sign in
            </Button>
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={signCtx.onNothing}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignIn;

const styles = {
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold"
  },
  form: {
    width: 400
  },
  input: {
    my: 1
  },
  button: {
    marginTop: 3,
    height: 50,
    mx: 2,
    fontSize: 18
  }
}
