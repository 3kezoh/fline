import { useAuthentication, useForm } from '@fline/hooks';
import { Button, Grid, Input } from '@fline/ui';

const formInitialState = {
  email: '',
};

export function ResetPassword() {
  const { abort, data, error, isLoading, resetPassword } = useAuthentication();

  const [formData, onChange, onSubmit] = useForm(formInitialState, () =>
    resetPassword(formData)
  );

  const { email } = formData;

  return (
    <div>
      <h1>Reset password</h1>
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
          <Button type="submit">Reset password</Button>
          {isLoading && <Button onClick={abort}>Abort</Button>}
          {error && <p>{JSON.stringify(error, null, 2)}</p>}
          {data && (
            <Grid>
              <span>
                {`A reset password email has been sent to the following address: ${email}`}
              </span>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
}

export default ResetPassword;
