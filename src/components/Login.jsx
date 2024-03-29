import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { LOGIN_API_URL } from "../config.json";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto",
  },
  form: {
    paddingTop: "10%",
  },
  field: {
    marginBottom: "2%",
  },
}));

function Login({ setToken, setId }) {
  const classes = useStyles();

  function submitHandle(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const auth = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    fetch(LOGIN_API_URL, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if (res.status === 422) {
        throw new Error("Something went wrong in your Login process");
      }
      return res.json();
    }).then((result) => {
      setToken(result.token);
      setId(result.id);
    }).catch(err => {
      e.target.reset();
      console.log(err);
    });
  }

  return (
    <Box>
      <Typography variant="h1" className={classes.root}>
        Login
      </Typography>
      <form onSubmit={submitHandle} className={classes.root + " " + classes.form} autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          fullWidth={true}
          name="username"
          className={classes.field}
          required
        />

        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          fullWidth={true}
          name="password"
          className={classes.field}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <p>Not a member? <a href="/#">Signup now</a></p>
      </form>
    </Box>
  );
}

export default Login;