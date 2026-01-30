import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// We then add user type to the request marking the data we're going to throw at it later.
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number,
                userCode: string,
            }
        }
    }
}


const { sign, verify } = jwt;

export const requireAuthentication = (
    req: Request, res: Response, next: NextFunction
) => {
    // Grabs the token of passed through the header
    let hToken = req.headers.authorization;

    // Checks if the token actually exists otherwise throws a response error.

    if (!hToken?.startsWith("Bearer ")) {
        return res.status(401).json({
            Error: "NOT_AUTHENTICATED"
        });
    }
    
    // Removing "Bearer " from token string
    const token = hToken.split(' ')[1];

    // Pulling out server's secret key
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        return res.status(404).json({
            Error: "AUTHENTICATION_KEY_NOT_FOUND"
        })
    }

    // Payload 
    try {
        // Checks if token provided is right for the given operation
        const payload = verify(token, secretKey) as {
            id: number,
            email: string,
            userCode: string
        }

        // Then we pass in the data from the user trying to access into the request
        req.user = {
            id: payload.id,
            userCode: payload.userCode
        }
        next();
    } catch (error) {
        return res.status(401).json({
            Error: "TOKEN_PROVIDED_NOT_VALID"
        })
    }
}