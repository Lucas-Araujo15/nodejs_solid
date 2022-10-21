import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

class TurnUserAdminUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): void {
        const receivedUser = this.usersRepository.findById(user_id);

        if (!receivedUser) {
            throw new Error("User doesn't exist!");
        }

        this.usersRepository.turnAdmin(receivedUser);
    }
}

export { TurnUserAdminUseCase };
