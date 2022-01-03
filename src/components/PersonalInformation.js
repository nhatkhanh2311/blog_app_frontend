import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {
  Avatar, Badge, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography
} from "@mui/material";
import {AddAPhoto as AddAPhotoIcon} from "@mui/icons-material";

function PersonalInformation(props) {
  const sbCtx = useContext(snackbarContext);

  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState("");
  const [upAvatar, setUpAvatar] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/personal")
      .then((res) => {
        setId(res.data.user.id);
        setUsername(res.data.user.username);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setBirthday(new Date(res.data.user.birthday));
        setPhone(res.data.user.phone);
        setGender(res.data.user.gender === 1 ? "Male" : res.data.user.gender === 0 ? "Female" : "Other");
        setAvatar(res.data.user.avatar);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });
  }

  const uploadAvatar = () => {
    if (upAvatar) {
      setDisable(true);
      const formData = new FormData();
      formData.append("avatar", upAvatar[0]);
      axios
        .post("/avatar", formData)
        .then((res) => {
          setDialog(false);
          sbCtx.onSnackbar("Upload avatar successfully!", "success");
          getData();
          props.render();
        })
        .catch((err) => {
          sbCtx.onSnackbar("Something wrong! Please try again!", "error");
          setDisable(false);
        });
    }
    else {
      sbCtx.onSnackbar("You must upload a avatar first!", "warning");
    }
  }

  return (
    <Card>
      <Typography textAlign="center" fontWeight="bold" fontSize={30} my={2}>
        Personal Information
      </Typography>

      <Box display="block">
        {avatar ? (
          <Avatar src={avatar} sx={styles.badge}/>
        ) : (
          <Box sx={styles.badge}>
            <Badge overlap="circular" anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                   badgeContent={<AddAPhotoIcon sx={styles.icon}/>} onClick={() => setDialog(true)}>
              <Avatar sx={styles.avatar}/>
            </Badge>
          </Box>
        )}
      </Box>

      <Dialog open={dialog} onClose={() => setDialog(false)}>
        <DialogTitle>
          Upload Avatar
        </DialogTitle>

        <DialogContent>
          <input type="file"
                 onChange={(e) => setUpAvatar(e.currentTarget.files)}/>

          {upAvatar !== null && <img src={URL.createObjectURL(upAvatar[0])} height={300}/>}
        </DialogContent>

        <DialogActions>
          <Button disabled={disable} onClick={uploadAvatar}>ok</Button>
          <Button onClick={() => setDialog(false)}>cancel</Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2} mx={1} mt={1}>
        <Grid item xs={4}>
          <Typography>Username:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{username}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mx={1} mt={1}>
        <Grid item xs={4}>
          <Typography>Full name:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{name}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mx={1} mt={1}>
        <Grid item xs={4}>
          <Typography>Email:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{email}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mx={1} mt={1}>
        <Grid item xs={4}>
          <Typography>Birthday:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{birthday.getMonth() + 1}/{birthday.getDate()}/{birthday.getFullYear()}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mx={1} mt={1}>
        <Grid item xs={4}>
          <Typography>Phone:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{phone}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} mx={1} my={1}>
        <Grid item xs={4}>
          <Typography>Gender:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>{gender}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PersonalInformation;

const styles = {
  badge: {
    mx: "auto",
    my: 2,
    height: 200,
    width: 200
  },
  avatar: {
    height: 200,
    width: 200
  },
  icon: {
    height: 40,
    width: 40
  }
}
