import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";

import PersonalInformation from "../components/PersonalInformation";
import PersonalListEntries from "../components/PersonalListEntries";
import FollowBar from "../components/FollowBar";

function Personal() {
  const [render, setRender] = useState(false);

  useEffect(() => {
    document.title = "Personal - Blog App"
  }, []);

  return (
    <Grid container sx={styles.grid}>
      <Grid item xs={3.5}>
        <PersonalInformation render={() => setRender(!render)}/>
      </Grid>

      <Grid item xs={6}>
        <PersonalListEntries refresh={render}/>
      </Grid>

      <Grid item xs={2.5}>
        {localStorage.getItem("token") && <FollowBar/>}
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
