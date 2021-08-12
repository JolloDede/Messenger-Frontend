import { AppBar, Box, Button, makeStyles, Modal, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import Contacts from "./ContactList";
import NewContactModal from "./NewContactModal";
import Conversations from "./Conversations";
import NewConversationModal from "./NewConversationModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
    display: "inline-block",
    height: "100vh",
  },
  sidebarContent: {
    height: "90vh",
    display: "inline-block",
    overflow: "auto",
  },
  modal: {
    backgroundColor: "grey",
    top: "10vh",
    display: "table",
    margin: "0 auto",
    padding: "20px",
    border: "2px solid black",
    borderRadius: "20px",
  },
}));

export default function Sidebar({ id }) {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();
  const conversationsOpen = active === 0;

  const handleChange = (event, newActiv) => {
    setActive(newActiv);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Box className={classes.root}>
      <Box>
        <AppBar position="static">
          <Tabs value={active} onChange={handleChange}>
            <Tab label="Conversation" />
            <Tab label="Contacts" />
          </Tabs>
        </AppBar>
        <Box className={classes.sidebarContent}>
          {conversationsOpen ? <Conversations /> : <Contacts />}
        </Box>
        <Button onClick={() => setModalOpen(true)} variant="contained" color="primary">
          New {conversationsOpen ? "Conversation" : "Contact"}
        </Button>
        <p>{id}</p>
      </Box>

      <Modal
        open={modalOpen}
        onClose={closeModal}
      >
        <Box className={classes.modal}>
          {(conversationsOpen ?
            <NewConversationModal closeModal={closeModal} /> :
            <NewContactModal closeModal={closeModal} />
          )}
        </Box>
      </Modal>
    </Box>
  );
}