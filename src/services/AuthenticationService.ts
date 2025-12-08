import { User, UserCreationInputDTO, UserCreationOutputDTO } from '../models/User.js';
import { UserRegisterService } from './UserRegisterService.js';
import jwt from 'jsonwebtoken';
import { UserRepository } from './UserRepository.js';

// Services to be fed upon
const userRepo = new UserRepository();
const registerService = new UserRegisterService()

// Both of the methods we're using from jwt are put out below
const { sign, verify } = jwt;


export class AuthenticationService {

    // This method calls in the createUser method from UserRegisterService and then generates a token and does all the stuff for jwt.
    async register(userData: UserCreationInputDTO)
        : Promise<
            {
                user: UserCreationOutputDTO;
                token: string
            }
        > {
        // Creates user and saves to DB
        const newUser = await registerService.registerUser(userData);

        const securityKey = process.env.JWT_SECRET;

        if (!securityKey) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        // Generates token for the user logging in
        const genToken = sign(
            {
                id: newUser.id,
                email: newUser.email
            },
            securityKey,
            { expiresIn: '15d' }
        )

        return {
            user: newUser,
            token: genToken
        };
    }

    async login(email: string, password: string): Promise<any> {

        const persistent_user = await userRepo.findUserByEmail(email);

        const isValid = await User.verifyPassword(
            // Login Attempt password
            password,
            // Persistent password
            persistent_user.password
        )

        if (!isValid) {
            throw new Error("Invalid Credentials!")
        }

        return persistent_user;
    }

    verifyToken(token: string) {
        const securityKey = process.env.JWT_SECRET;

        if (!securityKey) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        return verify(token, securityKey);
    }
}