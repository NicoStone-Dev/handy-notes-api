import { User, UserCreationInputDTO, UserCreationOutputDTO } from '../models/User.js';
import { UserRegisterService } from './UserRegisterService.js';
import jwt from 'jsonwebtoken';
import { UserRepository } from './repos/UserRepository.js';
import { prisma } from '../prisma.js';

// Services to be fed upon
const userRepo = new UserRepository();
const registerService = new UserRegisterService();

// Both of the methods we're using from jwt are put out below
const { sign, verify } = jwt;


export class AuthenticationService {

    // This method calls in the createUser method from UserRegisterService and then generates a token and does all the stuff for jwt.
    async register(userData: UserCreationInputDTO):
        Promise<{
            user: UserCreationOutputDTO;
            token: string
        }> {
        // Creates user and saves to DB
        const newUser = await registerService.registerUser(userData);

        const securityKey = process.env.JWT_SECRET;

        if (!securityKey) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        // Generates token for the user logging in
        const genToken = sign(
            // Defines what variables are linked to the token
            {
                id: newUser.id,
                userCode: newUser.userCode,
            },
            securityKey,
            { expiresIn: '15d' }
        )

        return {
            user: newUser,
            token: genToken
        };
    }

    async login(email: string, loginPassword: string):
        Promise<{
            user: UserCreationOutputDTO;
            token: string
        }> {

        const persistent_user = await userRepo.findUserByEmail(email);

        const isValid = await User.verifyPassword(
            // Login Attempt password
            loginPassword,
            // Persistent password
            persistent_user.password
        )
        if (!isValid) {
            throw new Error("INVALID_CREDENTIALS")
        }

        const securityKey = process.env.JWT_SECRET;

        if (!securityKey) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        const genToken = sign(
            {
                id: persistent_user.id,
                userCode: persistent_user.userCode,
            },
            securityKey,
            { expiresIn: "15d" }
        )

        return {
            user: persistent_user,
            token: genToken
        };
    }

    verifyToken(token: string) {
        const securityKey = process.env.JWT_SECRET;

        if (!securityKey) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        return verify(token, securityKey);
    }

    async passwordUpdate(userCode: string, password: string, newPassword: string) {
        try {
            const exists = await userRepo.existsByUserHashCode(userCode);

            if (exists) {
                const user = await userRepo.findUserByUserHashCode(userCode);

                // Verifying input password
                if (await User.verifyPassword(password, user.password)) {

                    // In turn allowing the update on such characteristic
                    return prisma.user.update({
                        where: {
                            userCode: userCode,
                        },
                        data: {
                            password: newPassword,
                        }
                    })
                } else throw new Error();
            }
        } catch (err) {
            console.log(err)
        }
    }
}
