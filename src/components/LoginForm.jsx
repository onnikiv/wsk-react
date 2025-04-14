import useForm from '../hooks/formHooks';
import useAuthentication from '../hooks/apiHooks';

const LoginForm = () => {
  const {postLogin} = useAuthentication();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = () => {
    console.log(inputs);
    // TODO: add login functionalities here
    postLogin(inputs);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  console.log(inputs);
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={() => {}}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleSubmit}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export {LoginForm};
