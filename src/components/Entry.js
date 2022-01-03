import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
  Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Dialog, DialogActions, DialogContent,
  Typography
} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import moment from "moment";

import ListComments from "./ListComments";

function Entry(props) {
  const [openImage, setOpenImage] = useState(false);
  const [expandComment, setExpandComment] = useState(false);

  return (
    <Card sx={styles.card}>
      <CardHeader avatar={<Avatar src={props.data.avatar} component={Link} to={`/user/${props.data.username}`}/>}
                  title={
                    <Typography sx={styles.title} component={Link} to={`/user/${props.data.username}`}>
                      {props.data.name}
                    </Typography>
                  }
                  subheader={moment(props.data.created_at).fromNow()}/>

      <CardMedia component="img" image={props.data.image} height={400} alt="image"
                 onClick={() => setOpenImage(true)}/>

      <CardContent>
        <Typography textAlign="center" fontWeight="bold" fontSize={20} mb={1}>
          {props.data.title}
        </Typography>

        <Typography whiteSpace="pre-line">
          {props.data.body}
        </Typography>
      </CardContent>

      <CardActions>
        <Button color="inherit" onClick={() => setExpandComment(!expandComment)}>
          comments
          <ExpandMoreIcon sx={expandComment ? styles.expandOn : {}}/>
        </Button>
      </CardActions>

      <Collapse in={expandComment}>
        <ListComments entryId={props.data.id}/>
      </Collapse>

      <Dialog open={openImage} onClose={() => setOpenImage(false)} fullWidth>
        <DialogContent>
          <img src={props.data.image} width="100%" alt="image"/>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenImage(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Entry;

const styles = {
  card: {
    mb: 3,
    mr: 3
  },
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  },
  expandOn: {
    transform: "rotate(180deg)"
  }
}
