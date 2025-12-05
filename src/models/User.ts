import bcrypt from 'bcrypt';
import { Task } from "./Task.js";

export class User {
    private constructor(
        // Generated and readonly:  
        readonly id: number,
        readonly userCode: string,
        readonly createdAt: Date,
        // Defined through method
        private _email: string,
        private _username: string,
        private _password: string,
        tasks?: Task[],
    ) { }

    public get username() {
        return this._username;
    }

    public get email() {
        return this._email;
    }

    public get password() {
        return this._password;
    }

    static async hashPassword(password: string): Promise<string> {
        const hashed_password = await bcrypt.hash(password, 10);

        return hashed_password;
    }

    public static async verifyPassword(login_password: string, persistent_password: string): Promise<boolean> {

        return bcrypt.compareSync(login_password, persistent_password);
    }


    // Class static method for user creation
    static async createFromInput(data: UserCreationInputDTO): Promise<User> {

        const hashed_password = await User.hashPassword(data.password);

        return new User(
            // Passing in the info which the service is not going to supply and using the data from input
            // This is done outside of services just ot keep the hashed_password secure in here
            0,
            '',
            new Date(),
            data.email,
            data.username,
            hashed_password,
        )
    }
}

// Data manipulation objects:

export type UserCreationInputDTO = {
    username: string,
    password: string,
    email: string
}

export type UserCreationOutputDTO = {
    id: number,
    userCode: string,
    createdAt: Date,
    email: string,
    username: string,
    password: string,
}

export type UserReadDTO = {
    id: number,
    userCode: string,
    email: string,
    createdAt: Date,
    username: string,
}

export type userUpdateDTO = {
    username?: string,
    email?: string,
}