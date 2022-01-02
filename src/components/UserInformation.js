import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, Box, Button, Card, Grid, Typography} from "@mui/material";
import {AddBox as AddBoxIcon, Cancel as CancelIcon} from "@mui/icons-material";

function UserInformation(props) {
  const sbCtx = useContext(snackbarContext);
  const {username} = useParams();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [disable, setDisable] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    getData();
  }, [username]);

  const getData = () => {
    axios
      .get(`/user?username=${username}`)
      .then((res) => {
        setId(res.data.user.id);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setBirthday(new Date(res.data.user.birthday));
        setPhone(res.data.user.phone);
        setGender(res.data.user.gender === 1 ? "Male" : res.data.user.gender === 0 ? "Female" : "Other");
        setFollowed(res.data.followed);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });
  }

  const follow = () => {
    if (localStorage.getItem("token")) {
      setDisable(true);
      axios
        .post("/follow", {
          followed_id: id
        })
        .then((res) => {
          sbCtx.onSnackbar("Followed successfully!", "success");
          props.render();
          setDisable(false);
          setFollowed(true);
        })
        .catch((err) => {
          sbCtx.onSnackbar("Something wrong! Please try again!", "error");
          setDisable(false);
        });
    }
    else {
      sbCtx.onSnackbar("You must sign in to follow!", "warning");
    }
  }

  const unfollow = () => {
    setDisable(true);
    axios
      .post("/unfollow", {
        followed_id: id
      })
      .then((res) => {
        sbCtx.onSnackbar("Unfollowed successfully!", "success");
        props.render();
        setDisable(false);
        setFollowed(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
        setDisable(false);
      });
  }

  return (
    <Card>
      <Box display="block">
        <Avatar src="" sx={styles.avatar}/>
      </Box>

      <Typography textAlign="center" fontWeight="bold" fontSize={30} my={2}>
        {name}
      </Typography>

      <Box sx={styles.follow}>
        <Button disabled={disable} color={followed ? "error" : "primary"} variant="contained"
                startIcon={followed ? <CancelIcon/> : <AddBoxIcon/>} onClick={followed ? unfollow : follow}>
          {followed ? "unfollow" : "follow"}
        </Button>
      </Box>

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

export default UserInformation;

const styles = {
  avatar: {
    height: 200,
    width: 200,
    mx: "auto",
    my: 2
  },
  follow: {
    display: "flex",
    justifyContent: "center"
  }
}
