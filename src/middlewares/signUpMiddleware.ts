import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createUserSchema = z.object({
    email: z.string().trim().toLowerCase().email({ message: "Email inválido" }),
    password: z.string().trim().min(8, { message: "Sua senha deve conter no mínimo 8 caracteres." }),
    name: z.string().trim().min(1, { message: 'O campo nome é obrigatório.' })
});

export const signUpMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map(err => err.message);
        return res.status(422).json({
            message: "Erros de validação",
            errors
        });
    }

    next();
};