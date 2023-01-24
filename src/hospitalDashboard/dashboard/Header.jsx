import React from "react";
import { IconPlus } from '@tabler/icons';
import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import Add from "./Add";

function Header({ setIsAdding }) {
  const [opened, setOpened] = useState(false);
  return (
    <header>
      <div style={{ display: 'flex' }}>
        <h1 style={{ color: '#1976D2', fontWeight: '100' }}>
        Users Management{' '}
        </h1>
        <Group position='right'>
          <button
            style={{ position: 'absolute', right: '60px', border: 'none' }}
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setOpened(true)}
          >
            {/* Add Hospital */}
            <IconPlus /> Add New User
          </button>
        </Group>

        <Modal
          className="bg-white"
          opened={opened}
          onClose={() => setOpened(false)}
        >
          <Add setIsAdding={setIsAdding} />
          {/* <LeftForm /> */}
        </Modal>

      </div>
    </header>
  );
}
//
export default Header;
