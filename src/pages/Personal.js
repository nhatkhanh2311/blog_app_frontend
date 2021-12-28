import React, {useEffect} from "react";
import {Grid} from "@mui/material";

import PersonalInformation from "../components/PersonalInformation";
import PersonalListEntries from "../components/PersonalListEntries";

function Personal() {
  useEffect(() => {
    document.title = "Personal - Blog App"
  }, []);

  return (
    <Grid container spacing={2} sx={styles.grid}>
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
