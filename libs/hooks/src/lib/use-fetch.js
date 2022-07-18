import { useState, useCallback, useRef } from 'react';

/**
 * @typedef {Object} State
 * @property {Object} data The data returned by the request.
 * @property {boolean} isLoading Whether the request is in progress.
 * @property {*} error The error returned by the request.
 */

/**
 * @callback request The function to make a request.
 * @param {string|URL} url The url to request.
 * @param {Object} [options] An object containing any custom settings that you want to apply to the request. See https://developer.mozilla.org/en-US/docs/Web/API/fetch
 */

/**
 * @callback abort
 */

/**
 * @description Hook to request data.
 * @param {string|URL} url The url to request.
 * @param {Object} options An object containing any custom settings that you want to apply to the request. See https://developer.mozilla.org/en-US/docs/Web/API/fetch
 * @returns {[State, request, abort]} An array containing in order:
 * - `state` - An object containing the data returned by the request, the loading state and the error (if any).
 * - `request` - The function to request data.
 * - `abort` - The function to abort the request.
 */
export function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const abortController = useRef(null);

  /**
   * Function to request.
   */
  const request = useCallback(async (url, options) => {
    abortController.current = new AbortController();

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, {
        signal: abortController.current.signal,
        ...options,
      });

      const json = await response.json();

      if (!response.ok) {
        return setError(json);
      }

      return setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Function to abort the request.
   */
  const abort = useCallback(() => {
    abortController.current?.abort();

    setIsLoading(false);
  }, []);

  return [{ isLoading, error, data }, request, abort];
}

export default useFetch;
