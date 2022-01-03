import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, Card, CardContent, CardHeader, Container, Grid, Typography} from "@mui/material";

function ListUsers() {
  const sbCtx = useContext(snackbarContext);
  const {search} = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, [search]);

  const getData = () => {
    axios
      .get(`/search?search=${search}`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });
  }

  return (
    <Container>
      {users.map((user) => (
        <Card sx={styles.card}>
          <CardHeader avatar={<Avatar src={user.avatar} component={Link} to={`/user/${user.username}`}/>}
                      title={
                        <Typography sx={styles.title} component={Link} to={`/user/${user.username}`}>
                          {user.name}
                        </Typography>
                      }
                      subheader={user.username}/>

          <CardContent>
            <Grid container spacing={2} mx={1}>
              <Grid item xs={4}>
                <Typography>Full name:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.name}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mx={1}>
              <Grid item xs={4}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.email}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mx={1}>
              <Grid item xs={4}>
                <Typography>Phone:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.phone}</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} mx={1}>
              <Grid item xs={4}>
                <Typography>Gender:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{user.gender}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default ListUsers;

const styles = {
  card: {
    mb: 3,
    mr: 3
  },
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  }
}
