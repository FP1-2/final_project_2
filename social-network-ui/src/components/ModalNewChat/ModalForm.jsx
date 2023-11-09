import React from "react";
import {
  Box,
  Checkbox,
  Modal,
  FormLabel,
  InputLabel,
  TextField,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { addChatMember } from "./../../redux/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";

function ModalForm({ user }) {
  const chatMember = useSelector((state) => state.chat.newChatMembers);
  const dispatch = useDispatch();
  const handleEvent = (event) => {
    dispatch(addChatMember(event.target.value));
  };

  return (
    <div>
      {" "}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox value={user.id} onChange={handleEvent} />}
          key={user.id}
          label={`${user.firstName}  ${user.lastName}`}
        ></FormControlLabel>
      </FormGroup>
    </div>
  );
}
ModalForm.propTypes = {
  user: PropTypes.object,
};

export default ModalForm;

