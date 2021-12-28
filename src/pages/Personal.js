import React, {useEffect} from "react";
import {Grid} from "@mui/material";

import PersonalInformation from "../components/PersonalInformation";
import PersonalListEntries from "../components/PersonalListEntries";
import FollowedBar from "../components/FollowedBar";

function Personal() {
  useEffect(() => {
    document.title = "Personal - Blog App"
  }, []);

  return (
    <Grid container sx={styles.grid}>
      <Grid item xs={3.5}>
        <PersonalInformation/>
      </Grid>

      <Grid item xs={6}>
        <PersonalListEntries/>
      </Grid>

      <Grid item xs={2.5}>
        <FollowedBar/>
      </Grid>
    </Grid>
  );
}

export default Personal;

const styles = {
  grid: {
    mt: 2
  }
}
