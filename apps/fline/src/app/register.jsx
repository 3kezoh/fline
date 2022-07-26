import { useAuthentication, useForm } from '@fline/hooks';
import { Button, Grid, Input } from '@fline/ui';

const formInitialState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  HTML: false,
  CSS: false,
  JavaScript: false,
  TypeScript: false,
  React: false,
  Node: false,
};

const validTechnologies = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Node',
];

export function Register() {
  const { abort, data, error, isLoading, register } = useAuthentication();

  const [formData, onChange, onSubmit] = useForm(formInitialState, () => {
    const { email, firstName, lastName, password, ...technologies } = formData;

    const body = {
      email,
      firstName,
      lastName,
      password,
      technologies: Object.keys(technologies).filter(
        (technology) => technologies[technology]
      ),
    };

    register(body);
  });

  const { email, firstName, lastName, password } = formData;

  const isAtLeastOneTechnologyIsChecked = validTechnologies.some(
    (technology) => formData[technology]
  );

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <Grid spacing={2}>
          <Input
            isRequired
            label="First name"
            name="firstName"
            onChange={onChange}
            value={firstName}
          />
          <Input
            isRequired
            label="Last name"
            name="lastName"
            onChange={onChange}
            value={lastName}
          />
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
          <Grid direction="column" justifyItems="center">
            {validTechnologies.map((technology) => (
              <Input
                key={technology}
                isChecked={formData[technology]}
                isRequired={!isAtLeastOneTechnologyIsChecked}
                label={technology}
                name={technology}
                onChange={onChange}
                type="checkbox"
              />
            ))}
          </Grid>
          <Button isLoading={isLoading} type="submit">
            Register
          </Button>
          {isLoading && <Button onClick={abort}>Abort</Button>}
          {error && <p>{JSON.stringify(error, null, 2)}</p>}
          {data && (
            <Grid>
              <span>
                {`Thank you for registering, a verification email has been sent to the following address: ${data.email}`}
              </span>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  );
}

export default Register;
