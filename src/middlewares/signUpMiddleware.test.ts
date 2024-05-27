import { Request, Response, NextFunction } from 'express';
import { signUpMiddleware } from './signUpMiddleware';

describe('signUpMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() if request data is valid', () => {
        signUpMiddleware(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
    });

    it('should return 422 with validation errors if request data is invalid', () => {
        req.body = { email: 'invalid-email', password: '123', name: '' }; // Dados inválidos
        signUpMiddleware(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: "Erros de validação",
            errors: [
                "Email inválido",
                "Sua senha deve conter no mínimo 8 caracteres.",
                "O campo nome é obrigatório."
            ]
        });
    });
});
