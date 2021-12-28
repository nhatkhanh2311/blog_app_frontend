import React, {useEffect} from "react";
import {Redirect, useParams} from "react-router-dom";
import {Grid} from "@mui/material";

import UserInformation from "../components/UserInformation";
import UserListEntries from "../components/UserListEntries";

function User() {
  const {username} = useParams();

  useEffect(() => {
    document.title = `${username} - Blog App`
  }, []);

  return (
    <>
      {localStorage.getItem("username") === username ? (
        <Redirect to="/personal"/>
      ) : (
        <Grid container spacing={2} sx={styles.grid}>
          <Grid item xs={3.5}>
            <UserInformation/>
          </Grid>

          <Grid item xs={6}>
            <UserListEntries/>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default User;

const styles = {
  grid: {
    m: 0
  }
}
