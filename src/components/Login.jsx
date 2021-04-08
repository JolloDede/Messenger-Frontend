
function Login({ setToken, setUsername }) {

  function submitHandle(e) {
    e.preventDefault();

    const API_URL = "http://localhost:5000/auth/login";
    const formData = new FormData(e.target);
    const auth = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then((result) => {
      setToken(result.token);
      setUsername(result.username);
    });
  }

  return (
    <form onSubmit={submitHandle}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      <button type="submit">Login</button>
      <p>Not a member? <a href="/#">Signup now</a></p>
    </form>
  );
}

export default Login;