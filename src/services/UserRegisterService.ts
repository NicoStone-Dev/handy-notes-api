import { UserCreationInputDTO, UserCreationOutputDTO, User } from '../models/User';
import { prisma } from '../prisma.js';
import { UserRepository } from './repos/UserRepository';
import validator from 'validator';
import { ValidationError } from '../shared/errors/ValidationError';

const userRepo = new UserRepository;

// The sole purpose of this class is to handle user registration, including creation, validation of username and email.
export class UserRegisterService {

    // Just validate if it is a real e-mail or not, later on we add account-creation confirmation message through that very same e-mail.
    private async validateEmail(email: string): Promise<ValidationErrorType[]> {
        const errors = [];

        const exists = await userRepo.existsByEmail(email);

        if (exists) {
            throw new Error("User with email " + email + " already exists")
        }

        if (validator.isEmpty(email)) {
            errors.push({
                field: "EMAIL",
                error: "EMPTY_FIELD" 
            })
        }

        if (!validator.isEmail(email)) {
            errors.push({
                field: "EMAIL",
                error: "INVALID_EMAIL"
            })
        }

        return errors;
    }

    private async validateUsername(username: string): Promise<ValidationErrorType[]> {
        const errors = [];
        const regex_magic = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        const exists = await userRepo.existsByUsername(username);

        if (exists) {
            throw new Error(
                "User with username " + username + " already exists"
            )
        }


        if (validator.isEmpty(username)) {
            errors.push({
                field: "USERNAME",
                error: "EMPTY_FIELD"
            })
        }

        if (!validator.isLength(username, { min: 5, max: 12 })) {
            errors.push({
                field: "USERNAME",
                error: "LENGTH_RULES_NOT_MET"
            })
        }

        if (!regex_magic.test(username)) {
            errors.push({
                field: "USERNAME",
                error: "EXCLUDED_CHARACTER_RULES_NOT_MET"
            })
        }
        return errors;
    }

    // Min of 8 characteres of which must contain at least 1 lowercase, 1 uppercase and a symbol such as '@'
    private validatePassword(password: string): ValidationErrorType[] {
        const debugErrors = [];
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!validator.isLength(password, { min: 8 })) {
            debugErrors.push("LENGTH_RULES_NOT_MET");
        }

        if (!passwordRegex.test(password)) {
            debugErrors.push("REGEX_RULES_NOT_MET");
        }
        
        if (debugErrors.length > 0) {
            return [{ field: "PASSWORD", error: "INVALID_PASSWORD" }];
        }

        return [];
    }

    private async validateRegistration(email: string, username: string, password: string): Promise<ValidationResultType> {
        const errors: ValidationErrorType[] = [];

        // We await just the async methods
        errors.push(...await this.validateEmail(email));
        errors.push(...await this.validateUsername(username));
        errors.push(...this.validatePassword(password));

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    async registerUser(userData: UserCreationInputDTO): Promise<UserCreationOutputDTO> {
        
        const checkDataValidation = await this.validateRegistration(userData.email, userData.username, userData.password)

        if (!checkDataValidation.valid) {
            throw new ValidationError<ValidationErrorType>(checkDataValidation.errors, "User data validation has failed!")
        }

        const user = await User.createFromInput(userData);

        return await prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                password: user.password,
            }
        }
        )
    }
}

export type ValidationErrorType = {
    field: string,
    error: string
}

export type ValidationResultType = {
    valid: boolean,
    errors: ValidationErrorType[]
} 