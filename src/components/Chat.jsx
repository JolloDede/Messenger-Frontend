import { Grid, makeStyles } from "@material-ui/core";
import { useConversations } from "../contexts/ConversationProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  sidebarStyle: {
    // display: "inline-block",
    height: "100vh",
  },
  openConvStyle: {
    // display: "inline-block",
  }
}));

function Chat({ id }) {
  const { selectedConversation } = useConversations();
  const classes = useStyles();

  return (
    <>
      <Grid item xs={3}>
        <Sidebar id={id} style={classes.sidebarStyle} />
      </Grid>
      <Grid item xs={9}>
        {selectedConversation && <OpenConversation style={classes.openConvStyle} />}
      </Grid>
    </>
  );
}

export default Chat;