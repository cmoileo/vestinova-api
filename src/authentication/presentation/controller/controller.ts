import { Request, Response } from "express";
import {CreateUserUseCase} from "../../domain/use-case/create-user.use-case";
import {IUserRepository} from "../../infrastructure/repository/IUserRepository";
import {isCreateUserDto} from "../dto/createUser.dto";
import hashPasswordService from "../../../shared/service/hashPassword.service";
import {isLoginUserDto} from "../dto/loginUser.dto";
import {LoginUserUseCase} from "../../domain/use-case/login-user.use-case";

export class AuthController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.registerHandler = this.registerHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
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
}