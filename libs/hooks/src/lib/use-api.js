import { useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useFetch, State } from './use-fetch';

// ! This should not be here, but it is here for now.
const apiUrl = {
  production: 'https://ekezoh-fline.herokuapp.com',
  development: 'http://localhost:3333',
};

/**
 * @callback requestApi The function to request the fline API.
 * @param {string} pathname The pathname to request. (e.g. /login)
 * @param {Object} [options] An object containing any custom settings that you want to apply to the request. See https://developer.mozilla.org/en-US/docs/Web/API/fetch
 */

/**
 * @callback abort
 */

/**
 * @description Hook to use fetch to request the fline API.
 * @returns {[State, requestApi, abort]} An array containing in order:
 * - `state` - An object containing the data returned by the request, the loading state and the error (if any).
 * - `requestApi` - The function to request the fline API.
 * - `abort` - The function to abort the request.
 */
export function useApi() {
  const [fetchData, request, abort] = useFetch();

  const requestApi = useCallback(
    (pathname, options) => {
      const url = new URL(pathname, apiUrl[process.env.NODE_ENV]);

      return request(url, {
        ...options,
        ...(options?.body && {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(options.body),
        }),
      });
    },
    [request]
  );

  return [fetchData, requestApi, abort];
}

export default useApi;
