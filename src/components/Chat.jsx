import { Box, makeStyles } from "@material-ui/core";
import { useConversations } from "../contexts/ConversationProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  sidebarStyle: {
    width: "30%",
    display: "inline-block",
    height: "100vh",
  },
  openConvStyle: {
    width: "70%",
    display: "inline-block",
  }
}));

function Chat({ id }) {
  const { selectedConversation } = useConversations();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Sidebar id={id} style={classes.sidebarStyle} />
      {selectedConversation && <OpenConversation style={classes.openConvStyle} />}
    </Box>
  );
}

export default Chat;