import React, {useEffect, useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {Grid} from "@mui/material";

import UserInformation from "../components/UserInformation";
import UserListEntries from "../components/UserListEntries";
import FollowBar from "../components/FollowBar";

function User() {
  const {username} = useParams();

  const [render, setRender] = useState(false);

  useEffect(() => {
    document.title = `${username} - Blog App`
  }, [username]);

  return (
    <>
      {localStorage.getItem("username") === username ? (
        <Redirect to="/personal"/>
      ) : (
        <Grid container sx={styles.grid}>
          <Grid item xs={3.5}>
            <UserInformation render={() => setRender(!render)}/>
          </Grid>

          <Grid item xs={6}>
            <UserListEntries/>
          </Grid>

          <Grid item xs={2.5}>
            {localStorage.getItem("token") && <FollowBar refresh={render}/>}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default User;

const styles = {
  grid: {
    mt: 2
  }
}
