import React from "react";
import {Grid} from "@mui/material";

import PersonalInformation from "../components/PersonalInformation";
import PersonalListEntries from "../components/PersonalListEntries";

function Personal() {
  return (
    <Grid container spacing={3} sx={styles.grid}>
      <Grid item xs={3.5}>
        <PersonalInformation/>
      </Grid>

      <Grid item xs={6}>
        <PersonalListEntries/>
      </Grid>
    </Grid>
  );
}

export default Personal;

const styles = {
  grid: {
    m: 0
  }
}
