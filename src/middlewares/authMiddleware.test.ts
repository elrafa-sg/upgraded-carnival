import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from './authMiddleware';
import { verifyToken } from '../helpers/auth';

jest.mock('../helpers/auth', () => ({
    verifyToken: jest.fn(),
}));

describe('authMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock<NextFunction>;

    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer testToken',
            },
            body: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add userId to request body if token is valid', () => {
        (verifyToken as jest.Mock).mockReturnValueOnce({ id: 'testUserId' });

        authMiddleware(req as Request, res as Response, next);

        expect(verifyToken).toHaveBeenCalledWith('testToken');
        expect(req.body.userId).toBe('testUserId');
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if token is not provided', () => {
        const req = { headers: { authorization: undefined } }

        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'O token não foi informado' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if token is expired', () => {
        (verifyToken as jest.Mock).mockImplementationOnce(() => {
            throw new Error('Expired token');
        });

        authMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('O token já expirou');
        expect(next).not.toHaveBeenCalled();
    });
});
