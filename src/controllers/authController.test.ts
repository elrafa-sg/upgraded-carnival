import { Request, Response } from 'express';
import { AuthController } from './authController';
import { mongoClient } from '../database/mongoClient';
import bcrypt from 'bcrypt';
import { generateTokens } from '../helpers/auth';

jest.mock('bcrypt');
jest.mock('../helpers/auth');
jest.mock('../database/mongoClient', () => ({
    mongoClient: {
      user: {
        findFirst: jest.fn(),
      },
    },
  }));

describe('AuthController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate user successfully', async () => {
    const user = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedpassword',
    };
    (mongoClient.user.findFirst as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (generateTokens as jest.Mock).mockReturnValue('fakeAccessToken');

    await AuthController.authUser(req as Request, res as Response);

    expect(mongoClient.user.findFirst).toHaveBeenCalledWith({
      where: { email: req.body.email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
    expect(generateTokens).toHaveBeenCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      email: user.email,
      name: user.name,
      accessToken: 'fakeAccessToken',
    });
  });

  it('should return 400 if email is not found', async () => {
    (mongoClient.user.findFirst as jest.Mock).mockResolvedValue(null);

    await AuthController.authUser(req as Request, res as Response);

    expect(mongoClient.user.findFirst).toHaveBeenCalledWith({
      where: { email: req.body.email },
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Senha ou email inválidos!' });
  });

  it('should return 400 if password is invalid', async () => {
    const user = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'hashedpassword',
    };
    (mongoClient.user.findFirst as jest.Mock).mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await AuthController.authUser(req as Request, res as Response);

    expect(mongoClient.user.findFirst).toHaveBeenCalledWith({
      where: { email: req.body.email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Senha inválida!' });
  });

  it('should handle unexpected errors', async () => {
    const errorMessage = 'Unexpected error';
    (mongoClient.user.findFirst as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await AuthController.authUser(req as Request, res as Response);

    expect(mongoClient.user.findFirst).toHaveBeenCalledWith({
      where: { email: req.body.email },
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: errorMessage });
  });
});
