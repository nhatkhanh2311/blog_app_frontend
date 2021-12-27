import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Container, Dialog, Fab, Typography} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";

import CreateEntry from "./CreateEntry";
import Entry from "./Entry";

function PersonalListEntries() {
  const sbCtx = useContext(snackbarContext);

  const [fabVariant, setFabVariant] = useState("circular");
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    editData();
  }, [data]);

  const refresh = () => {
    getData();
  }

  const getData = () => {
    axios
      .get("/entries")
      .then((res) => {
        setName(res.data.name);
        setData(res.data.entries);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });
  }

  const editData = () => {
    let entries = [];
    data.forEach((data) => {
      entries.push({
        id: data.id,
        title: data.title,
        body: data.body,
        image: data.image,
        name: name,
        created_at: data.created_at,
        updated_at: data.updated_at
      });
    });
    setEntries(entries);
  }

  return (
    <Container>
      <Fab color="primary" aria-label="add" variant={fabVariant} sx={styles.fab}
           onMouseEnter={() => setFabVariant("extended")}
           onMouseLeave={() => setFabVariant("circular")}
           onClick={() => setDialog(true)}>
        {fabVariant === "circular" ? (
          <AddIcon/>
        ) : (
          <Typography maxHeight>create entry</Typography>
        )}
      </Fab>

      <Dialog open={dialog} onClose={() => setDialog(false)} fullWidth>
        <CreateEntry disable={(value) => setDialog(value)} render={(value) => refresh()}/>
      </Dialog>

      {entries.map((entry) => (
        <Entry key={entry.id} data={entry}/>
      ))}
    </Container>
  );
}

export default PersonalListEntries;

const styles = {
  fab: {
    height: 50,
    mb: 2
  }
}
