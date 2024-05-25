import jwt from 'jsonwebtoken';
import { generateTokens, verifyToken } from './auth';

jest.mock('jsonwebtoken');

describe('Auth Helpers', () => {
    const dataToEncript = { id: 'user123' };
    const token = 'fakeToken';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('generateTokens', () => {
        it('should generate a token with the provided data', () => {
            const signMock = jwt.sign as jest.Mock;
            signMock.mockReturnValue(token);

            const generatedToken = generateTokens(dataToEncript);

            expect(signMock).toHaveBeenCalledWith(dataToEncript, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_EXPIRES });
            expect(generatedToken).toBe(token);
        });
    });

    describe('verifyToken', () => {
        it('should verify a token and return the decoded data', () => {
            const decodedData = { id: 'user123' };
            const verifyMock = jwt.verify as jest.Mock;
            verifyMock.mockReturnValue(decodedData);

            const result = verifyToken(token);

            expect(verifyMock).toHaveBeenCalledWith(token, process.env.ACCESS_SECRET);
            expect(result).toBe(decodedData);
        });

        it('should throw an error if the token is invalid', () => {
            const verifyMock = jwt.verify as jest.Mock;
            verifyMock.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(() => verifyToken(token)).toThrow('Invalid token');
            expect(verifyMock).toHaveBeenCalledWith(token, process.env.ACCESS_SECRET);
        });
    });
});
