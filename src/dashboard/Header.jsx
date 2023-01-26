import React from "react";

import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import Add from "./Add";
import { IconPlus } from "@tabler/icons";

function Header({ setIsAdding }) {
  return (
    <header>
      <div style={{ display: "flex" }}>
        <h1 style={{ color: "#1976D2", fontWeight: "100" }}>
          Foods List Management{" "}
        </h1>
        <Group position="right">
          <button
            style={{ position: "absolute", right: "60px", border: "none" }}
            className="btn bg-green-500 hover:bg-green-600 text-white"
            onClick={() => setIsAdding(true)}
          >
            {/* Add Hospital */}
            <IconPlus /> Add
          </button>
        </Group>
      </div>
      <div>
        {/* <Add setIsAdding={setIsAdding} /> */}

        <br />
      </div>
    </header>
  );
}
//
export default Header;
