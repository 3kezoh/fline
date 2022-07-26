import { useAuthentication, useForm } from '@fline/hooks';
import { Button, Grid, Input } from '@fline/ui';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const formInitialState = {
  password: '',
};

export function ChangePassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { abort, changePassword, data, error, isLoading } = useAuthentication();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/', { replace: true });
    }

    return () => {
      abort();
    };
  }, [abort, navigate, searchParams]);

  const [formData, onChange, onSubmit] = useForm(formInitialState, () => {
    const token = searchParams.get('token');

    return changePassword({ ...formData, token });
  });

  const { password } = formData;

  return (
    <div>
      <h1>Change password</h1>
      <form onSubmit={onSubmit}>
        <Grid spacing={2}>
          <Input
            isRequired
            label="Password"
            name="password"
            onChange={onChange}
            type="password"
            value={password}
          />
          <Button type="submit">Change password</Button>
          {isLoading && <Button onClick={abort}>Abort</Button>}
          {error && <p>{JSON.stringify(error, null, 2)}</p>}
          {data && (
            <Grid>
              <span>Your password has been changed.</span>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
}

export default ChangePassword;
