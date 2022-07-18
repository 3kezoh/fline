import { useAuthentication, useForm } from '@fline/hooks';
import { Button, Grid, Input } from '@fline/ui';

const formInitialState = {
  email: '',
  password: '',
};

export function Login() {
  const { abort, data, error, isLoading, login } = useAuthentication();

  const [formData, onChange, onSubmit] = useForm(formInitialState, () =>
    login(formData)
  );

  const { email, password } = formData;

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <Grid spacing={2}>
          <Input
            isRequired
            label="Email"
            name="email"
            onChange={onChange}
            type="email"
            value={email}
          />
          <Input
            isRequired
            label="Password"
            name="password"
            onChange={onChange}
            type="password"
            value={password}
          />
          <Button type="submit">Login</Button>
          {isLoading && <Button onClick={abort}>Abort</Button>}
          {error && <p>{JSON.stringify(error, null, 2)}</p>}
        </Grid>
      </form>
    </div>
  );
}

export default Login;
