import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const AuthUserSchema = z.object({
    email: z.string().trim().toLowerCase().email({ message: "Email inválido" }),
    password: z.string().trim().min(8, { message: "Sua senha deve conter no mínimo 8 caracteres." }),
});

export const signInMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = AuthUserSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map(err => err.message);
        return res.status(422).json({
            message: "Erros de validação",
            errors
        });
    }

    next();
};