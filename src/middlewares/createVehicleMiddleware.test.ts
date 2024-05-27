import { Request, Response, NextFunction } from 'express';
import { createVehicleMiddleware } from './createVehicleMiddleware';

describe('createVehicleMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {
                plate: 'ABC1234', // Um exemplo de placa inválida com menos de 7 caracteres
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
        req.body.plate = 'ABC1234'; // Uma placa válida com 7 caracteres
        createVehicleMiddleware(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
    });

    it('should return 422 with validation errors if request data is invalid', () => {
        req.body.plate = 'ABC'; // Uma placa inválida com menos de 7 caracteres
        createVehicleMiddleware(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: "Erros de validação",
            errors: ["A Placa deve conter 7 caracteres. Somente letras e números."]
        });
    });
});
