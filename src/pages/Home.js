import React, {useEffect} from "react";
import {Grid} from "@mui/material";

import HomeListEntries from "../components/HomeListEntries";
import FollowedBar from "../components/FollowedBar";

function Home() {
  useEffect(() => {
    document.title = "Home - Blog App"
  }, []);

  return (
    <Grid container sx={styles.grid}>
      <Grid item xs={3.5}/>

      <Grid item xs={6}>
        <HomeListEntries/>
      </Grid>

      <Grid item xs={2.5}>
        {localStorage.getItem("token") && <FollowedBar/>}
      </Grid>
    </Grid>
  );
}

export default Home;

const styles = {
  grid: {
    mt: 2
  }
}
