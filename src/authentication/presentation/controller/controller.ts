import { Request, Response } from "express";
import {IUserRepository} from "../../infrastructure/repository/IUserRepository";
import {isCreateUserDto} from "../dto/createUser.dto";
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
    this.getUserProfileHandler = this.getUserProfileHandler.bind(this);
    this.getUserPublicPageHandler = this.getUserPublicPageHandler.bind(this);
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
    const { firstname, lastname, email } = req.body; 

    try {
        const updatedUser = await new UpdateUserUseCase(this.userRepository, this.imageStorageService).execute({
            userId,
            avatarFile,
            firstname,
            lastname,
            email,
        });

        if (updatedUser instanceof Error) {
            throw updatedUser;
        }

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


  public async getUserProfileHandler(req: Request, res: Response) {
    console.log("Route hit: /api/user/:userId/profile");
    const userId = req.params.userId;
    console.log("User ID received:", userId);

    try {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
          console.log("User not found in database");
          return res.status(404).json({ error: "User not found" });
        }

        const response = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          avatar: user.avatar,
          items: user.items,
        };

        console.log("User profile:", response);
        res.status(200).json(response);
    } catch (error: any) {
      console.error("Error in getUserProfileHandler:", error.message);
      res.status(500).json({ error: error.message });
    }
  }

  public async getUserPublicPageHandler(req: Request, res: Response) {
    console.log("Route hit: /api/user/:userId/public");
    const userId = req.params.userId;

    try {
      const user = await this.userRepository.getUserByIdWithItems(userId);

      if (!user) {
        console.log("User not found in database");
        return res.status(404).json({ error: "User not found" });
      }

      const publicData = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        items: user.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
        })),
      };

      console.log("User public data:", publicData);
      return res.status(200).json(publicData);
    } catch (error: any) {
      console.error("Error in getUserPublicPageHandler:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }





}