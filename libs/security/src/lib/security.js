import { sign, verify } from 'jsonwebtoken';

/**
 * @description Sign the given `payload` into a JSON Web Token
 * @param {*} payload The payload to sign
 * @returns {string} The JSON Web Token
 */
export function signToken(payload) {
  console.log(payload);
  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}

/**
 * @description Verify a JWT token
 * @param {string} token The token to be verified
 * @returns {Promise<string|null>} The decoded token or null if invalid
 */
export function verifyToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
