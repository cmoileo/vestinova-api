import express from "express";
import { AuthController } from "./authentication/presentation/controller/controller";
import {UserRepository} from "./authentication/infrastructure/repository/UserRepository";
import authGuard from "./shared/middleware/auth.guard";
import {ItemRepository} from "./items/infrastructure/repository/ItemRepository";
import {ItemController} from "./items/presentation/controller/controller";
import multer from 'multer';
import {CartRepository} from "./cart/infrastructure/repository/CartRepository";
import {CartController} from "./cart/presentation/controller";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const userRepository = new UserRepository();
const authController = new AuthController(userRepository);

router.post("/api/auth/register", authController.registerHandler);
router.post("/api/auth/login", authController.loginHandler);
router.put("/api/auth/update/:id", upload.single('avatar'), authController.updateHandler);
router.get("/api/user/:userId/profile", authGuard, authController.getUserProfileHandler);
router.get("/api/user/:userId/public", authGuard, authController.getUserPublicPageHandler);


const itemRepository = new ItemRepository();
const itemController = new ItemController(itemRepository);

router.post("/api/items", authGuard, upload.single('image'), itemController.createItem);
router.get("/api/items/count", authGuard, itemController.getItemsCount);
router.delete("/api/items/:id", authGuard, itemController.deleteItem);
router.get("/api/items/:id", authGuard, itemController.findItemById);
router.get("/api/items", authGuard, itemController.getItems);
router.put("/api/items/:id", authGuard, itemController.updateItem);
router.get("/api/items-categories", itemController.getCategories);
router.get("/api/items-search", itemController.searchItems);
router.post("/api/items/:itemId/like", authGuard, itemController.likeItemHandler);
router.get("/api/items/:itemId/likes", itemController.getLikesHandler);

const cartRepository = new CartRepository();
const cartController = new CartController(cartRepository);

router.put("/api/cart/add", authGuard, cartController.addItemToCart);
router.patch("/api/cart/:id", authGuard, cartController.deleteCartItem);
router.delete("/api/cart/:id", authGuard, cartController.clearCart);
router.get("/api/cart-items", authGuard, cartController.getCartItems);

export default router;