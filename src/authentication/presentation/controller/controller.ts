import { Request, Response } from "express";
import {CreateUserUseCase} from "../../domain/use-case/create-user.use-case";
import {IUserRepository} from "../../infrastructure/repository/IUserRepository";
import {isCreateUserDto} from "../dto/createUser.dto";
import hashPasswordService from "../../../shared/service/hashPassword.service";
import {isLoginUserDto} from "../dto/loginUser.dto";
import {CreateUserUseCase} from "../../domain/use-case/create-user.use-case";
import {LoginUserUseCase} from "../../domain/use-case/login-user.use-case";
import {UpdateUserUseCase} from "../../domain/use-case/update-user.use-case";
import hashPasswordService from "../../../shared/service/hashPassword.service";
import {ImageStorageService} from "../../../shared/service/imageStorage.service";

export class AuthController {
  private userRepository: IUserRepository;
  private imageStorageService: ImageStorageService;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.imageStorageService = new ImageStorageService();
    this.registerHandler = this.registerHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  public async registerHandler(req: Request, res: Response) {
    const body = req.body;
    if (!isCreateUserDto(body)) return res.status(400).json({ error: 'Invalid body' });
    try {
      const createdUser = await new CreateUserUseCase(this.userRepository).execute(body);
      res.status(201).json(createdUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async loginHandler(req: Request, res: Response) {
    const body = req.body;
    if (!isLoginUserDto(body)) return res.status(400).json({ error: 'Invalid body' });
    try {
      const loggegUser = await new LoginUserUseCase(this.userRepository).execute(body);
      res.status(201).json(loggegUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateHandler(req: Request, res: Response) {
    const userId = req.params.id;
    const avatarFile = req.file;

    if (!avatarFile) {
      return res.status(400).json({ error: "Avatar file is required" });
    }

    try {
      const avatarUrl = await new UpdateUserUseCase(this.userRepository, this.imageStorageService).execute({
        userId,
        avatarFile,
      });
      res.status(200).json({ avatarUrl });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}