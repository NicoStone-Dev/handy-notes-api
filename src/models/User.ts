
import bcrypt from 'bcrypt';

export class User {
    private constructor(
        // Generated and readonly:  
        public readonly id: number,
        public readonly userCode: string,
        public readonly createdAt: Date,
        // Defined through method
        private _email: string,
        private _username: string,
        private _password: string,
    ) { }

    public verifyPassword(password: string): boolean {
        return bcrypt.compareSync(password, this._password);
    }

    public get username(){
        return this._username;
    }
    
    public get email(){
        return this._email;
    }

    public get password(){
        return this._password;
    }

    // Class static method for user creation
    static async createFromInput(data: UserCreationInputDTO): Promise<User>{

        const hashed_password = await bcrypt.hash(data.password, 10);

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
    id : number,
    userCode: string,
    createdAt : Date,
    email: string,
    username: string,
    password: string,
}

export type UserReadDTO= {
    id : number,
    userCode: string,
    email: string,
    createdAt : Date,
    username: string,
}

export type userUpdateDTO = {
    username?: string,
    email?: string,
}