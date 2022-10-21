import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ email, name }: IRequest): void {
        const userAlreadyExists = this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        this.usersRepository.create({ name, email });
    }
}

export { CreateUserUseCase };
