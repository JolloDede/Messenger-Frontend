function Login(props) {
  return (
    <form onSubmit={props.submitHandle}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"/>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div>
        <p>Not a member? <a href="/#">Signup now</a></p>
      </div>
    </form>
  );
}

export default Login;