import { UserService } from '@fline/user';
import { ValidationError } from 'sequelize';
import { compare } from 'bcryptjs';
import { signToken } from '@fline/security';
import { sendMail } from '@fline/mailer';
import { VerifyTokenService } from '@fline/verify-token';

const userService = new UserService();
const verifyTokenService = new VerifyTokenService();

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
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function register(req, res, next) {
  try {
    const user = await userService.create(req.body);

    const verifyToken = await verifyTokenService.create({ userId: user.id });

    const verifyTokenUrl = new URL('/verify', process.env.FLINE_URL);

    verifyTokenUrl.searchParams.append('token', verifyToken.value);

    await sendMail({
      to: user.email,
      subject: 'Welcome to Fline',
      text:
        'To verify your account, please click this link : ' +
        verifyTokenUrl.href,
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
 * @description Verify a user
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

    await Promise.all([user.save(), verifyToken.destroy(verifyToken.id)]);

    return res.json({ message: 'User verified' });
  } catch (error) {
    return next(error);
  }
}
