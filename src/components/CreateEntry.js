import React, {useContext, useEffect, useState} from "react";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";
import {
  Button, DialogActions, DialogContent, DialogTitle, FormControl, TextField, Typography
} from "@mui/material";

function CreateEntry(props) {
  const sbCtx = useContext(snackbarContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [validateTitle, setValidateTitle] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setTitle("");
    setBody("");
    setImage(null);
    setValidateTitle(false);
    setDisableButton(false);
  }, [props.open]);

  const validate = () => {
    if (title.length === 0) {
      setValidateTitle(true);
      return false;
    }
    else {
      setValidateTitle(false);
      return true;
    }
  }

  const onSubmit = () => {
    if (validate()) {
      setDisableButton(true);
      const formData = new FormData();
      formData.append("entry[title]", title);
      formData.append("entry[body]", body);
      formData.append("entry[image]", image[0]);
      axios
        .post("/entries", formData)
        .then((res) => {
          sbCtx.onSnackbar("Created entry successfully!", "success");
          props.disable(false);
          props.render(true);
        })
        .catch((err) => {
          sbCtx.onSnackbar("Something wrong! Please try again!", "error");
          setDisableButton(false);
        });
    }
  }

  return (
    <>
      <DialogTitle sx={styles.title}>
        Create An Entry
      </DialogTitle>

      <DialogContent>
        <FormControl fullWidth>
          <Typography>
            Title
          </Typography>

          <TextField id="title" type="text" variant="standard" fullWidth sx={styles.input} autoFocus
                     error={validateTitle} helperText={validateTitle ? "Title can't be blank!" : ""}
                     onChange={(e) => setTitle(e.currentTarget.value)}/>

          <Typography>
            Content
          </Typography>

          <TextField id="body" type="text" multiline rows={5} variant="standard" fullWidth sx={styles.input}
                     onChange={(e) => setBody(e.currentTarget.value)}/>

          <Typography>
            Image
          </Typography>

          <input id="image" type="file" style={styles.upImage}
                 onChange={(e) => setImage(e.currentTarget.files)}/>

          {image !== null && <img src={URL.createObjectURL(image[0])} style={styles.image}/>}

          <Button disabled={disableButton} variant="contained" color="success" sx={styles.button}
                  onClick={onSubmit}>
            create
          </Button>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.disable(false)}>cancel</Button>
      </DialogActions>
    </>
  );
}

export default CreateEntry;

const styles = {
  title: {
    fontSize: 30,
    textAlign: "center",
    mb: 0.5,
    fontWeight: "bold"
  },
  input: {
    my: 1
  },
  button: {
    marginTop: 3,
    height: 50,
    mx: 5,
    fontSize: 18
  },
  upImage: {
    marginTop: 2
  },
  image: {
    height: 100
  }
}
