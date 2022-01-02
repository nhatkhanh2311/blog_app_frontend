import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, Card, CardHeader, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function FollowBar(props) {
  const sbCtx = useContext(snackbarContext);

  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    getData();
  }, [props.refresh]);

  const getData = () => {
    axios
      .get("/following-users")
      .then((res) => {
        setFollowings(res.data.users);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });

    axios
      .get("/followed-users")
      .then((res) => {
        setFollowers(res.data.users);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });
  }

  return (
    <>
      <Card>
        <Typography textAlign="center" fontWeight="bold" fontSize={20} my={2}>
          Following ({followings.length})
        </Typography>

        {followings.map((user) => (
          <CardHeader avatar={<Avatar src="" component={Link} to={`/user/${user.username}`}/>}
                      title={
                        <Typography sx={styles.title} component={Link} to={`/user/${user.username}`}>
                          {user.name}
                        </Typography>
                      }/>
        ))}
      </Card>

      <Card sx={styles.spacing}>
        <Typography textAlign="center" fontWeight="bold" fontSize={20} my={2}>
          Followers ({followers.length})
        </Typography>

        {followers.map((user) => (
          <CardHeader avatar={<Avatar src="" component={Link} to={`/user/${user.username}`}/>}
                      title={
                        <Typography sx={styles.title} component={Link} to={`/user/${user.username}`}>
                          {user.name}
                        </Typography>
                      }/>
        ))}
      </Card>
    </>
  );
}

export default FollowBar;

const styles = {
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  },
  spacing: {
    mt: 2
  }
}
