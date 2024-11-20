import {UserModel} from "../model/User.model";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { ImageStorageService } from "../../../shared/service/imageStorage.service";

export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly imageStorageService: ImageStorageService
    ) {}

    public async execute(data: { userId: string, avatarFile: any }): Promise<string | Error> {
        try {
            const user = await this.userRepository.getUserById(data.userId);
            if (!user) {
                throw new Error('User not found');
            }
            const avatarUrl = await this.imageStorageService.uploadImage(data.avatarFile);
            user.avatar = avatarUrl;
            await user.save();
            return avatarUrl;
        } catch (error) {
            return error;
        }
    }
}