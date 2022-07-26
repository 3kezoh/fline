import PropTypes from 'prop-types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import useApi from './use-api';
import useLocalStorage from './use-local-storage';

const AuthenticationContext = createContext();

/**
 * @typedef {Object} AuthenticationContextProps
 * @property {JSX.Element} children
 */

/**
 * @description Context provider for authentication.
 * @param {AuthenticationProviderProps} props
 * @returns {JSX.Element}
 */
export function AuthenticationProvider({ children }) {
  const [{ data, isLoading, error }, requestApi, abort] = useApi();

  const [, setAccessToken] = useLocalStorage('accessToken', null);

  /**
   * Set the access token in the local storage if it exists.
   */
  useEffect(() => {
    if (data?.accessToken) {
      setAccessToken(data.accessToken);
    }
  }, [data, setAccessToken]);

  /**
   * Function to get the access token from the fline API.
   */
  const login = useCallback(
    (body) => requestApi('/login', { body }),
    [requestApi]
  );

  /**
   * Function to logout.
   * @note Sets the access token to null in the local storage.
   */
  const logout = useCallback(() => setAccessToken(null), [setAccessToken]);

  /**
   * Function to register a new user.
   */
  const register = useCallback(
    (body) => requestApi('/register', { body }),
    [requestApi]
  );

  /**
   * Function to verify a user account.
   */
  const verify = useCallback(
    (token) => requestApi('/verify?' + new URLSearchParams({ token })),
    [requestApi]
  );

  /**
   * Function to reset the user password.
   */
  const resetPassword = useCallback(
    (body) => requestApi('/reset-password', { body }),
    [requestApi]
  );

  /**
   * Function to change the user password.
   */
  const changePassword = useCallback(
    (body) => requestApi('/change-password', { body }),
    [requestApi]
  );

  const value = useMemo(
    () => ({
      abort,
      changePassword,
      data,
      error,
      isLoading,
      login,
      logout,
      register,
      resetPassword,
      verify,
    }),
    [
      abort,
      changePassword,
      data,
      error,
      isLoading,
      login,
      logout,
      register,
      resetPassword,
      verify,
    ]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

AuthenticationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * @typedef {Object} AuthenticationContext
 * @property {Function} abort The function to abort the request.
 * @property {Function} changePassword The function to change the password.
 * @property {Object} data The data returned by the request.
 * @property {*} error The error returned by the request.
 * @property {boolean} isLoading Whether the request is in progress.
 * @property {Function} login Login the user.
 * @property {Function} logout Logout the user.
 * @property {Function} register Register a new user.
 * @property {Function} resetPassword Reset the user password.
 * @property {Function} verify Verify a user.
 */

/**
 * @description Hook to use the authentication context.
 * @returns {AuthenticationContext}
 */
export function useAuthentication() {
  return useContext(AuthenticationContext);
}
