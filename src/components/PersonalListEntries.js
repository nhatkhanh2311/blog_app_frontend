import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Container, Dialog, Fab, Pagination, Typography} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";

import CreateEntry from "./CreateEntry";
import Entry from "./Entry";

function PersonalListEntries(props) {
  const sbCtx = useContext(snackbarContext);

  const [fabVariant, setFabVariant] = useState("circular");
  const [dialog, setDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [props.refresh]);

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
        setUsername(res.data.username);
        setName(res.data.name);
        setAvatar(res.data.avatar);
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
        created_at: data.created_at,
        updated_at: data.updated_at,
        username: username,
        name: name,
        avatar: avatar
      });
    });
    setEntries(entries);
  }

  const handlePage = (e, value) => {
    setPage(value);
    window.scrollTo(0, 0);
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
        <CreateEntry disable={(value) => setDialog(value)} render={() => refresh()}/>
      </Dialog>

      {entries.slice((page - 1) * 5, page * 5).map((entry) => (
        <Entry key={entry.id} data={entry}/>
      ))}

      <Pagination count={Math.ceil(entries.length / 5)} page={page} sx={styles.pagination} onChange={handlePage}/>
    </Container>
  );
}

export default PersonalListEntries;

const styles = {
  fab: {
    height: 50,
    mb: 2
  },
  pagination: {
    mb: 2
  }
}
