import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Container} from "@mui/material";
import Entry from "./Entry";

function HomeListEntries() {
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState([]);
  const sbCtx = useContext(snackbarContext);

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
        name: data.name
      });
    });
    setEntries(entries);
  }

  return (
    <Container>
      {entries.map((entry) => (
        <Entry key={entry.id} data={entry}/>
      ))}
    </Container>
  );
}

export default HomeListEntries;
