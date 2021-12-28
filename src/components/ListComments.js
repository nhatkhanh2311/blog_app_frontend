import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, CardContent, CardHeader, Divider, Typography} from "@mui/material";
import moment from "moment";

import CreateComment from "./CreateComment";

function ListComments(props) {
  const sbCtx = useContext(snackbarContext);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const refresh = () => {
    getData();
  }

  const getData = () => {
    axios
      .get(`/comments?entry_id=${props.entryId}`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });
  }

  return (
    <>
      {comments.map((comment) => (
        <>
          <Divider/>

          <CardHeader avatar={<Avatar sx={styles.avatar} src="" component={Link} to={`/user/${comment.username}`}/>}
                      title={
                        <Typography sx={styles.title} component={Link} to={`/user/${comment.username}`}>
                          {comment.name}
                        </Typography>
                      }
                      subheader={<Typography sx={styles.sub}>{moment(comment.created_at).fromNow()}</Typography>}
                      sx={styles.header}/>

          <CardContent sx={styles.content}>
            <Typography fontSize={14}>
              {comment.content}
            </Typography>
          </CardContent>
        </>
      ))}

      <Divider/>

      {localStorage.getItem("token") &&
        <CreateComment entryId={props.entryId} render={() => refresh()}/>
      }
    </>
  );
}

export default ListComments;

const styles = {
  header: {
    height: 5,
    mt: 1.5
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textDecoration: "none"
  },
  avatar: {
    width: 30,
    height: 30
  },
  sub: {
    fontSize: 13
  }
}
