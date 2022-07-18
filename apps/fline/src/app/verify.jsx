import { useAuthentication } from '@fline/hooks';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { abort, data, error, isLoading, verify } = useAuthentication();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/', { replace: true });
    }

    verify(token);

    return () => {
      abort();
    };
  }, [abort, navigate, searchParams, verify]);

  return (
    <div>
      <h1>Verify</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{JSON.stringify(error, null, 2)}</p>}
      {data && <p>{JSON.stringify(data, null, 2)}</p>}
    </div>
  );
}

export default Verify;
