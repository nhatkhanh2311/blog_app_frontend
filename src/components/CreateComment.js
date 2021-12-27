import React, {useContext, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {Button, FormControl, Grid, TextField} from "@mui/material";
import {Send as SendIcon} from "@mui/icons-material";

function CreateComment(props) {
  const sbCtx = useContext(snackbarContext);

  const [content, setContent] = useState("");
  const [validateContent, setValidateContent] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const validate = () => {
    if (content.trim().length === 0) {
      setValidateContent(true);
      return false;
    }
    else {
      setValidateContent(false);
      return true;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setContent("");
      setDisableButton(true);
      axios
        .post("/comments", {
          comment: {
            content: content,
            entry_id: props.entryId
          }
        })
        .then((re) => {
          sbCtx.onSnackbar("Commented successfully!", "success");
          props.render();
          setDisableButton(false);
        })
        .catch((err) => {
          sbCtx.onSnackbar("Something wrong! Please try again!", "error");
          setDisableButton(false);
        });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl fullWidth>
        <Grid container>
          <Grid item sx={styles.content}>
            <TextField id="content" placeholder="Comment" value={content} type="text" variant="standard"
                       fullWidth error={validateContent} helperText={validateContent ? "Comment can't be blank!" : ""}
                       onChange={(e) => setContent(e.currentTarget.value)}/>
          </Grid>

          <Grid item sx={styles.button}>
            <Button disabled={disableButton} variant="contained" endIcon={<SendIcon/>} type="submit">
              send
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}

export default CreateComment;

const styles = {
  content: {
    mx: 2,
    mt: 1,
    display: "flex",
    flexGrow: 1
  },
  button: {
    mr: 2,
    my: 1,
    display: "flex",
    flexGrow: 0
  }
}
