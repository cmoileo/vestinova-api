import {UserModel} from "../model/User.model";
import {UserRepository} from "../../infrastructure/repository/UserRepository";
import hashPasswordService from "../../../shared/service/hashPassword.service";
import jwtService from "../../../shared/service/jwt.service";

export class CreateUserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async execute(
        data: {
            firstname: string,
            lastname: string,
            email: string,
            password: string
        }
    ): Promise<{token: string | Error}> {
        let newUser = new UserModel()
        const firstnameError = newUser.setFirstname(data.firstname)
        if (firstnameError instanceof Error) {
            throw firstnameError;
        }
        const lastnameError = newUser.setLastname(data.lastname)
        if (lastnameError instanceof Error) {
            throw lastnameError;
        }
        const emailError = newUser.setEmail(data.email)
        if (emailError instanceof Error) {
            throw emailError;
        }
        const passwordError = newUser.setPassword(data.password)
        if (passwordError instanceof Error) {
            throw passwordError;
        }
        newUser = Object.assign({}, newUser);
        try {
            newUser.password = await hashPasswordService.hashPassword(newUser.password);
            const createdUser = await this.userRepository.createUser(newUser);
            return {
                token: await jwtService.generateToken({ id: createdUser.id }, '30d')
            }
        } catch (error) {
            return error;
        }
    }
}