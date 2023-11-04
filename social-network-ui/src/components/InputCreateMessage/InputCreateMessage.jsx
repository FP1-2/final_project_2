import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import CustomInput from "../CustomInput/CustomInput";
import { Avatar, Box, CssBaseline, Button } from "@mui/material";
import { createMessage } from "../../redux/slices/chatSlice";
import * as Yup from "yup";

function InputCreatMessage() {
  const validationSchema = Yup.object({
    text: Yup.string(),
    chatId: Yup.number(),
  });

  const initialValues = {
    text: "",
    chatId: 2,
  };

  return (
    <Box sx={{
      position: 'absolute',
      bottom: 0,
    }}>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={createMessage}
      >
        <Form
          style={{
            width: "100%",
          }}
        > */}
          <CustomInput
            name="text"
            type="text"
            label="enter your text message"
            placeholder="enter your text message"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            margin="normal"
            sx={{
              marginBottom: "1.3rem",
              padding: "1.1rem 0",
              borderRadius: "2rem",
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "none",
              backgroundColor: "#1DA1F2",
            }}
          />
        {/* </Form>
      </Formik> */}
    </Box>
  );
}

export default InputCreatMessage;
