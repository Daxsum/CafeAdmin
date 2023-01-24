import React from "react";
import App from "./App";
import { MantineProvider } from "@mantine/core";
const Final = () => {
  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </div>
  );
};

export default Final;
