import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
    padding: "2px",
  },
  message: {
    minWidth: "20%",
    maxWidth: "90%",
    display: "inline-block",
    padding: "2px",
    borderRadius: "4px",
  },
  myMessage: {
    backgroundColor: "green",
    float: "right",
  },
  otherMessage: {
    backgroundColor: "grey",
  }
}));

function Message({ message, username }) {
  const classes = useStyles();

  let date = new Date(message.created);
  let hour = (date.getHours() >= 10) ? date.getHours() : "0" + date.getHours();
  let min = (date.getMinutes() >= 10) ? date.getMinutes() : "0" + date.getMinutes();
  let time = hour + ":" + min;
  let myMsg = username === message.name;

  return (
    <Box className={classes.root}>
      <Box className={`${myMsg ? classes.myMessage: classes.otherMessage} ${classes.message}`}>
        <h3>{myMsg ? "Me" : message.name}</h3>
        <p>{message.message}</p>
        <p>{time}</p>
      </Box>
    </Box>
  );
}

export default Message;