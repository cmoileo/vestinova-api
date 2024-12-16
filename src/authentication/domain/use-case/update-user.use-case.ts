import {UserModel} from "../model/User.model";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { ImageStorageService } from "../../../shared/service/imageStorage.service";

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly imageStorageService: ImageStorageService
    ) {}

    public async execute(data: {
        userId: string;
        firstname?: string;
        lastname?: string;
        email?: string;
        avatarFile?: any;
    }): Promise<UserModel | Error> {
        try {
            const user = await this.userRepository.getUserById(data.userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (data.avatarFile) {
                const avatarUrl = await this.imageStorageService.uploadImage(data.avatarFile);
                user.avatar = avatarUrl;
            }

            if (data.firstname) user.firstname = data.firstname;
            if (data.lastname) user.lastname = data.lastname;
            if (data.email) user.email = data.email;

            await user.save();
            return user;
        } catch (error) {
            return error;
        }
    }
}
