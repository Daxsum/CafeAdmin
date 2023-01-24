import React from "react";

import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import Add from "./Add";

function Header({ setIsAdding }) {
  const [opened, setOpened] = useState(false);
  return (
    <header>
      <h1 style={{ color: '#1976D2', fontWeight: '100' }}>Patient Management </h1>
      {/* <div>
        <Modal
          className="bg-white"
          opened={opened}
          onClose={() => setOpened(false)}
        >
          <Add setIsAdding={setIsAdding} /> */}
      {/* <LeftForm /> */}
      {/* </Modal>

        <Group position="left">
          <button
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={() => setOpened(true)}
          >
            Add Hospital
          </button>
        </Group>
      </div> */}
    </header>
  );
}
//
export default Header;
