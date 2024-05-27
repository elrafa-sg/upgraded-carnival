import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const CreateVehicleSchema = z.object({
    plate: z.string().trim().toLowerCase().length(7, { message: 'A Placa deve conter 7 caracteres. Somente letras e números.' }),
});

export const createVehicleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateVehicleSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map(err => err.message);
        return res.status(422).json({
            message: "Erros de validação",
            errors
        });
    }

    next();
};