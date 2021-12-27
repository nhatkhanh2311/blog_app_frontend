import React, {useState} from "react";
import {
  Avatar, Button, Card, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, Typography
} from "@mui/material";
import moment from "moment";

function Entry(props) {
  const [openImage, setOpenImage] = useState(false);

  return (
    <Card sx={styles.card}>
      <CardHeader avatar={<Avatar src=""/>}
                  title={<Typography sx={styles.title}>{props.data.name}</Typography>}
                  subheader={moment(props.data.created_at).fromNow()}/>

      <CardMedia component="img" image={props.data.image} height={400} alt="image"
                 onClick={() => setOpenImage(true)}/>

      <CardContent>
        <Typography textAlign="center" fontWeight="bold">
          {props.data.title}
        </Typography>

        <Typography whiteSpace="pre-line">
          {props.data.body}
        </Typography>
      </CardContent>

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
    fontWeight: "bold"
  }
}
