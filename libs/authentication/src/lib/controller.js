import { UserService } from '@fline/user';
import { ValidationError } from 'sequelize';
import { compare } from 'bcryptjs';
import { signToken } from '@fline/security';
import { sendMail } from '@fline/mailer';
import { VerifyTokenService } from '@fline/verify-token';
import { ResetTokenService } from '@fline/reset-token';
import * as dayjs from 'dayjs';

const userService = new UserService();
const verifyTokenService = new VerifyTokenService();
const resetTokenService = new ResetTokenService();

// TODO extract to a separate file

/**
 * @description Format a ValidationError to be used in the API
 * @param {ValidationError} validationError
 * @returns {Object}
 */
function formatValidationError(validationError) {
  return validationError.errors.reduce((accumulator, error) => {
    accumulator[error.path] = error.message;

    return accumulator;
  }, {});
}

/**
 * @description Register a new user
 * @note Sends a verification email to the user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function register(req, res, next) {
  try {
    const user = await userService.create(req.body);

    const verifyToken = await verifyTokenService.create({ userId: user.id });

    const verifyTokenURL = new URL('/verify', process.env.FLINE_URL);

    verifyTokenURL.searchParams.append('token', verifyToken.value);

    await sendMail({
      to: user.email,
      subject: 'Welcome to Fline !',
      html: `<p>To verify your account, please click on this link : ${verifyTokenURL.href}</p>`,
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json(formatValidationError(error));
    }

    return next(error);
  }
}

/**
 * @description Login a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function login(req, res, next) {
  try {
    const user = await userService.findByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    const isPasswordValid = await compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ password: 'Invalid password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ email: 'User not verified' });
    }

    const accessToken = signToken(user.toJSON());

    return res.json({ accessToken });
  } catch (error) {
    return next(error);
  }
}

/**
 * @description Verify a user using a token
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function verify(req, res, next) {
  try {
    if (!req.query.token) {
      return res.status(400).json({ token: 'Verify token is required' });
    }

    const verifyToken = await verifyTokenService.findByValue(req.query.token);

    if (!verifyToken) {
      return res.status(404).json({ token: 'Token not found' });
    }

    const user = await userService.findByPk(verifyToken.userId);

    if (!user) {
      return res.status(404).json({ user: 'User not found' });
    }

    user.isVerified = true;

    await Promise.all([user.save(), verifyToken.destroy()]);

    return res.json({ message: 'User verified' });
  } catch (error) {
    return next(error);
  }
}

/**
 * @description Sends a reset password email
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function resetPassword(req, res, next) {
  try {
    const user = await userService.findByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({ email: 'User not found' });
    }

    const resetToken = await resetTokenService.create({ userId: user.id });

    const resetTokenURL = new URL('/change-password', process.env.FLINE_URL);

    resetTokenURL.searchParams.append('token', resetToken.value);

    await sendMail({
      to: user.email,
      subject: 'Reset your password',
      html: `<p>To change your password, please click this link : ${resetTokenURL.href}</p>
      <p>It will expire in ${process.env.RESET_PASSWORD_EXPIRATION_IN_MINUTES} minutes.</p>`,
    });

    return res.status(201).json({ message: 'Email sent' });
  } catch (error) {
    return next(error);
  }
}

/**
 * @description Change a user password using a token
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
export async function changePassword(req, res, next) {
  try {
    if (!req.body.token) {
      return res.status(400).json({ token: 'Reset token is required' });
    }

    const resetToken = await resetTokenService.findByValue(req.body.token);

    if (!resetToken) {
      return res.status(404).json({ token: 'Token not found' });
    }

    const isResetTokenExpired = dayjs().isAfter(resetToken.expiresAt);

    if (isResetTokenExpired) {
      await resetToken.destroy();

      return res.status(401).json({ token: 'Token expired' });
    }

    const user = await userService.findByPk(resetToken.userId);

    if (!user) {
      return res.status(404).json({ user: 'User not found' });
    }

    user.password = req.body.password;

    await Promise.all([user.save(), resetToken.destroy()]);

    return res.json({ message: 'Password changed' });
  } catch (error) {
    return next(error);
  }
}
