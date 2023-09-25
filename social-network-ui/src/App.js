import AppRoutes from "./AppRoutes";
import React from "react";
import ModalRegisterWindow from "./components/ModalRegisterWindow/ModalRegisterWindow";
import Post from "./components/HomePage/Post/Post";
import TwitterWriteWindow from "./components/HomePage/TwitterWriteWindow/TwitterWriteWindow";

function App() {
  return (
    <>
      <TwitterWriteWindow />
      <Post />
      <AppRoutes />
      <ModalRegisterWindow />
    </>
  );
}

export default App;
