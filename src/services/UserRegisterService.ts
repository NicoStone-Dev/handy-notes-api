import { UserCreationInputDTO, UserReadDTO, UserCreationOutputDTO, userUpdateDTO, User } from '../models/User';
import { prisma } from '../prisma.js'; 
// The sole purpose of this class is to handle user registration, including creation, verification of already existing usernames, password, etc.
export class UserRegisterService {

    async createUser(userData: UserCreationInputDTO): Promise<UserCreationOutputDTO> {
        const user = await User.createFromInput(userData);

        const dbUser = await prisma.user.create({
            data: {
                email: user.email,
                username: user.username,
                password: user.password,
            }
        }
        )

        return dbUser;
    }
}