import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private users: User[];

    private static INSTANCE: UsersRepository;

    private constructor() {
        this.users = [];
    }

    public static getInstance(): UsersRepository {
        if (!UsersRepository.INSTANCE) {
            UsersRepository.INSTANCE = new UsersRepository();
        }

        return UsersRepository.INSTANCE;
    }

    create({ name, email }: ICreateUserDTO): void {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            created_at: new Date(),
            updated_at: new Date(),
            admin: false,
        });

        this.users.push(user);
    }

    findById(id: string): User | undefined {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            return undefined;
        }

        return user;
    }

    findByEmail(email: string): User | undefined {
        const user = this.users.find((user) => user.email === email);

        if (!user) {
            return undefined;
        }

        return user;
    }

    turnAdmin(receivedUser: User): User {
        const user = receivedUser;

        user.admin = true;
        user.updated_at = new Date();

        return user;
    }

    list(): User[] {
        return this.users;
    }
}

export { UsersRepository };
