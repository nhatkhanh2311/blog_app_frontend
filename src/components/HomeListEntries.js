import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Container, Pagination} from "@mui/material";
import Entry from "./Entry";

function HomeListEntries() {
  const sbCtx = useContext(snackbarContext);

  const [data, setData] = useState([]);
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    editData();
  }, [data]);

  const getData = () => {
    axios
      .get("/entries/all")
      .then((res) => {
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
        username: data.username,
        name: data.name,
        avatar: data.avatar
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
      {entries.slice((page - 1) * 5, page * 5).map((entry) => (
        <Entry key={entry.id} data={entry}/>
      ))}

      <Pagination count={Math.ceil(entries.length / 5)} page={page} sx={styles.pagination} onChange={handlePage}/>
    </Container>
  );
}

export default HomeListEntries;

const styles = {
  pagination: {
    mb: 2
  }
}
