import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, Box, Card, Grid, Typography} from "@mui/material";

function UserInformation() {
  const sbCtx = useContext(snackbarContext);
  const {username} = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`/user?username=${username}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setBirthday(new Date(res.data.birthday));
        setPhone(res.data.phone);
        setGender(res.data.gender === 1 ? "Male" : res.data.gender === 0 ? "Female" : "Other");
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
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
  }
}
