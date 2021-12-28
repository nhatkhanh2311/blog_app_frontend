import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Avatar, Card, CardHeader, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function FollowedBar(props) {
  const sbCtx = useContext(snackbarContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, [props.refresh]);

  const getData = () => {
    axios
      .get("/followed-users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Something wrong! Please try again!", "error");
      });
  }

  return (
    <Card>
      <Typography textAlign="center" fontWeight="bold" fontSize={20} my={2}>
        Followed Users
      </Typography>

      {users.map((user) => (
        <CardHeader avatar={<Avatar src="" component={Link} to={`/user/${user.username}`}/>}
                    title={
                      <Typography sx={styles.title} component={Link} to={`/user/${user.username}`}>
                        {user.name}
                      </Typography>
                    }/>
      ))}
    </Card>
  );
}

export default FollowedBar;

const styles = {
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  }
}
