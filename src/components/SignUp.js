import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import signContext from "../stores/sign-context";
import snackbarContext from "../stores/snackbar-context";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, Radio,
  RadioGroup, TextField, Typography
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {enUS} from "date-fns/locale";

function SignUp() {
  const signCtx = useContext(signContext);
  const sbCtx = useContext(snackbarContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [validations, setValidations] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setRepass("");
    setName("");
    setEmail("");
    setBirthday(null);
    setPhone("");
    setGender("male");
    setValidations({});
    setDisableButton(false);
  }, [signCtx.signUp]);

  const validate = () => {
    let validations = {
      username: false,
      usernameSpace: false,
      password: false,
      passwordSpace: false,
      repass: false,
      name: false,
      email: false,
      phone: false
    };
    let ok = true;
    if (username.length === 0) {
      validations.username = true;
      ok = false;
    }
    if (username.includes(" ")) {
      validations.usernameSpace = true;
      ok = false;
    }
    if (password.length < 8) {
      validations.password = true;
      ok = false;
    }
    if (password.includes(" ")) {
      validations.passwordSpace = true;
      ok = false;
    }
    if (repass !== password) {
      validations.repass = true;
      ok = false;
    }
    if (name.length === 0) {
      validations.name = true;
      ok = false;
    }
    if (email.length === 0) {
      validations.email = true;
      ok = false;
    }
    if (!(phone.length === 0 || /^\d+$/.test(phone))) {
      validations.phone = true;
      ok = false;
    }
    setValidations(validations);
    return ok;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setDisableButton(true);
      let genderNumber = gender === "male" ? 1 : gender === "female" ? 0 : 2;
      axios
        .post("/sign-up", {
          user: {
            username: username,
            password: password,
            name: name,
            email: email,
            birthday: birthday,
            phone: phone,
            gender: genderNumber
          }
        })
        .then((res) => {
          sbCtx.onSnackbar("Signed up successfully!", "success");
          signCtx.onNothing();
        })
        .catch((err) => {
          switch (err.response.data["message"]) {
            case "username taken":
              setValidations({usernameTaken: true}); break;
            case "email taken":
              setValidations({emailTaken: true}); break;
            default:
              sbCtx.onSnackbar("Something wrong! Please try again!", "error");
          }
          setDisableButton(false);
        });
    }
  }

  return (
    <Dialog open={signCtx.signUp} onClose={signCtx.onNothing} fullWidth>
      <DialogTitle sx={styles.title}>
        Create Account
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth>
            <Grid container spacing={1}>
              <Grid item md={2}/>

              <Grid item md={8}>
                <TextField id="username" label="Username" placeholder="Ex. thomas123" type="text"
                           variant="outlined" fullWidth sx={styles.input} autoFocus
                           error={validations.username || validations.usernameSpace || validations.usernameTaken}
                           helperText={validations.username ? "Username can't be blank!" :
                             validations.usernameSpace ? "Username can't have any spaces!" :
                               validations.usernameTaken ? "Username has already been taken!" : ""}
                           onChange={(e) => setUsername(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="password" label="Password" type="password"
                           variant="outlined" fullWidth sx={styles.input} error={validations.password || validations.passwordSpace}
                           helperText={validations.password ? "Password can't have less than 8 characters!" :
                             validations.passwordSpace ? "Password can't have any spaces!" : ""}
                           onChange={(e) => setPassword(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="repass" label="Retype password" type="password"
                           variant="outlined" fullWidth sx={styles.input} error={validations.repass}
                           helperText={validations.repass ? "Not the same as password!" : ""}
                           onChange={(e) => setRepass(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="name" label="Full name" placeholder="Ex. Thomas Clark" type="text"
                           variant="outlined" fullWidth sx={styles.input} error={validations.name}
                           helperText={validations.name ? "Full name can't be blank!" : ""}
                           onChange={(e) => setName(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <TextField id="email" label="Email address" placeholder="Ex. thomasclark@email.com" type="email"
                           variant="outlined" fullWidth sx={styles.input} error={validations.email || validations.emailTaken}
                           helperText={validations.email ? "Email can't be blank!" :
                             validations.emailTaken ? "Email has already been taken!" : ""}
                           onChange={(e) => setEmail(e.currentTarget.value)}/>
              </Grid>

              <Grid item md={6}>
                <Box sx={styles.input}>
                  <LocalizationProvider id="birthday" dateAdapter={AdapterDateFns} locale={enUS}>
                    <DatePicker label="Birthday (optional)" variant="standard" cancelText="Cancel"
                                onChange={(newDate) => setBirthday(newDate)} value={birthday}
                                renderInput={(params) => <TextField {...params}/>}/>
                  </LocalizationProvider>
                </Box>
              </Grid>

              <Grid item md={6}>
                <TextField id="phone" label="Phone number (optional)" type="text"
                           variant="outlined" fullWidth sx={styles.input} error={validations.phone}
                           helperText={validations.phone ? "Phone number must contain only numbers!" : ""}
                           onChange={(e) => setPhone(e.currentTarget.value)}/>
              </Grid>
            </Grid>

            <RadioGroup row value={gender} onChange={(e) => setGender(e.currentTarget.value)}>
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <Typography sx={styles.gender}>
                    Gender
                  </Typography>
                </Grid>

                <Grid item md={3} sx={styles.radio}>
                  <FormControlLabel control={<Radio/>} label="Male" value="male"/>
                </Grid>
                <Grid item md={3} sx={styles.radio}>
                  <FormControlLabel control={<Radio/>} label="Female" value="female"/>
                </Grid>
                <Grid item md={3} sx={styles.radio}>
                  <FormControlLabel control={<Radio/>} label="Other" value="other"/>
                </Grid>
              </Grid>
            </RadioGroup>

            <Button disabled={disableButton} variant="contained" color="success" sx={styles.button} type="submit">
              sign up
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

export default SignUp;

const styles = {
  title: {
    fontSize: 30,
    textAlign: "center",
    mb: 0.5,
    fontWeight: "bold"
  },
  input: {
    my: 1
  },
  button: {
    marginTop: 3,
    height: 50,
    mx: 5,
    fontSize: 18
  },
  gender: {
    mt: 1,
    textAlign: "center",
    color: "black",
    fontSize: 18
  },
  radio: {
    textAlign: "center"
  }
}
