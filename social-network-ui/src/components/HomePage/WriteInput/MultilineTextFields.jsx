import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function MultilineTextFields(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "35ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-textarea"
          value={props.tweetPost}
          onChange={props.onChange}
          //  label="Multiline Placeholder"
          placeholder="What's happening?!"
          multiline
          variant="standard"
          //  className={styles.inputTweet}
          //  color="warning"
        />
      </div>
    </Box>
  );
}
MultilineTextFields.propTypes = {
  tweetPost: PropTypes.string.isRequired, // Пропс 'text' має бути рядком і обов'язковим
  onChange: PropTypes.func.isRequired, // Пропс 'onChange' має бути функцією і обов'язковим
};
