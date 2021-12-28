import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Container} from "@mui/material";

import Entry from "./Entry";

function UserListEntries() {
  const sbCtx = useContext(snackbarContext);
  const {username} = useParams();

  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    editData();
  }, [data]);

  const getData = () => {
    axios
      .get(`/entries/user?username=${username}`)
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
        updated_at: data.updated_at,
        user_id: data.user_id
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

export default UserListEntries;
