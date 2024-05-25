import { Request, Response } from 'express';
import { UserController } from './userController';
import { mongoClient } from '../database/mongoClient';
import bcrypt from 'bcrypt';

jest.mock('../database/mongoClient', () => ({
    mongoClient: {
        user: {
            create: jest.fn(),
        },
    },
}));
jest.mock('bcrypt');

interface PrismaError extends Error {
    meta?: {
      target?: string;
    };
  }

describe('UserController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
            },
        };
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            status: statusMock,
        };
        (bcrypt.hashSync as jest.Mock).mockReturnValue('hashedpassword');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a user successfully', async () => {
        const createUserResponse = {
            email: 'test@example.com',
            name: 'Test User',
            password: 'hashedpassword',
        };
        (mongoClient.user.create as jest.Mock).mockResolvedValue(createUserResponse);

        await UserController.createUser(req as Request, res as Response);

        expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 10);
        expect(mongoClient.user.create).toHaveBeenCalledWith({
            data: {
                email: req.body.email,
                password: 'hashedpassword',
                name: req.body.name,
            },
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(createUserResponse);
    });

    it('should return 403 if email is already registered', async () => {
        const error: PrismaError = new Error();
        error.meta = { target: 'User_email_key' };
        (mongoClient.user.create as jest.Mock).mockRejectedValue(error);

        await UserController.createUser(req as Request, res as Response);

        expect(mongoClient.user.create).toHaveBeenCalledWith({
            data: {
                email: req.body.email,
                password: 'hashedpassword',
                name: req.body.name,
            },
        });
        expect(res.status).toHaveBeenCalledWith(403);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Email já cadastrado!' });
    });

    it('should handle unexpected errors', async () => {
        const error = new Error('Unexpected error');
        (mongoClient.user.create as jest.Mock).mockRejectedValue(error);

        await UserController.createUser(req as Request, res as Response);

        expect(mongoClient.user.create).toHaveBeenCalledWith({
            data: {
                email: req.body.email,
                password: 'hashedpassword',
                name: req.body.name,
            },
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Ocorreu um erro interno e sua requisição não pôde ser processada. Tente novamente mais tarde!' });
    });
});