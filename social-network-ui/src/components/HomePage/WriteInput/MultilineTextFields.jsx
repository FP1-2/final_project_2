import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function MultilineTextFields(props) {
  return (
    <TextField
      id="standard-textarea"
      name="text"
      value={props.value}
      onChange={props.onChange}
      placeholder="What's happening?!"
      multiline
      variant="standard"
      fullWidth
    />
  );
}
MultilineTextFields.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
