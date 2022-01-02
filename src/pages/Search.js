import React, {useEffect} from "react";
import {Grid} from "@mui/material";

import ListUsers from "../components/ListUsers";
import FollowBar from "../components/FollowBar";

function Search() {
  useEffect(() => {
    document.title = "Search - Blog App"
  }, []);

  return (
    <Grid container sx={styles.grid}>
      <Grid item xs={3.5}/>

      <Grid item xs={6}>
        <ListUsers/>
      </Grid>

      <Grid item xs={2.5}>
        {localStorage.getItem("token") && <FollowBar/>}
      </Grid>
    </Grid>
  );
}

export default Search;

const styles = {
  grid: {
    mt: 2
  }
}
