import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// We then add user type to the request marking the data we're going to throw at it later.
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number,
                email: string,
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

    // Checks if the token actually exists otherwise throws error.
    if (!hToken || !hToken.startsWith("Bearer ")) {
        res.status(401).json({
            Error: "NO_TOKEN_PROVIDED"
        })

        throw Error("NO_TOKEN_PROVIDED");
    }

    // Removing "Bearer " from token string
    const token = hToken.split(' ')[1];

    // Pulling out server's secret key
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        throw Error("JWT_SECRET IS NOT FOUND WITHIN ENVIRONMENT VARIABLES");
    }

    // Payload 
    try {
        // Checks if token provided is right for the given operation
        const payload = verify(token, secretKey) as {
            id: number,
            email: string
        }

        // Then we pass in the data from the user trying to access into the request
        req.user = {
            id: payload.id,
            email: payload.email
        }

    } catch (error) {
        res.status(401).json({
            Error: "TOKEN_PROVIDED_NOT_VALID"
        })

        throw Error("TOKEN_PROVIDED_NOT_VALID");
    }

}