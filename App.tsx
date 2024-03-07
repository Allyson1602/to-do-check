import React from "react";
import { NativeBaseProvider } from "native-base";
import theme from "./theme";
import { defineFont } from "./src/helpers/font";
import NavigationConfig from "./src/helpers/navigation";

export default function App() {
  if (defineFont()) {
    return (
      <NativeBaseProvider theme={theme}>
        <NavigationConfig />
      </NativeBaseProvider>
    );
  } else {
    return null;
  }
}
