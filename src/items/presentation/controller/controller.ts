import {ItemRepository} from "../../infrastructure/repository/ItemRepository";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {CreateItemUseCase} from "../../domain/use-case/create-item.use-case";
import {DeleteItemUseCase} from "../../domain/use-case/delete-item.use-case";
import {FindItemByIdUseCase} from "../../domain/use-case/find-item-by-id.use-case";
import {GetItemsUseCase} from "../../domain/use-case/get-items.use-case";
import {UpdateItemUseCase} from "../../domain/use-case/update-item.use-case";
import CategoryEntity from "../../infrastructure/entity/Category.entity";
import {GetCategoriesUseCase} from "../../domain/use-case/get-categories.use-case";
import {SearchItemsUseCase} from "../../domain/use-case/search-items.use-case";
import { LikeItemUseCase } from "../../domain/use-case/like-item.use-case";
import { RatingRepository } from "../../infrastructure/repository/RatingRepository";
import {Http2ServerResponse} from "node:http2";
import {ServerResponse} from "node:http";
import {ItemModel} from "../../domain/model/item.model";

export class ItemController {
    private readonly itemRepository: ItemRepository;
    private readonly ratingRepository: RatingRepository;

    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
        this.ratingRepository = new RatingRepository();

        this.createItem = this.createItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.findItemById = this.findItemById.bind(this);
        this.getItems = this.getItems.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.searchItems = this.searchItems.bind(this);
        this.likeItemHandler = this.likeItemHandler.bind(this);
        this.getLikesHandler = this.getLikesHandler.bind(this);
    }
    public async createItem(req: Request, res: any): Promise<void> {
        const item: any = req.body;
        //@ts-ignore
        const images = item.images.map(base64 => Buffer.from(base64, 'base64'));
        console.log(images);
        //@ts-ignore
        const userId = req.user.id;
        try {
            const createdItem: ItemEntity | Error  = await new CreateItemUseCase(this.itemRepository).execute(item, userId, images);
            res.status(201).json(createdItem);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteItem(req: Request, res: any): Promise<void> {
        //@ts-ignore
        const itemId = req.params.id;
        //@ts-ignore
        const userId = req.user.id;
        try {
            await new DeleteItemUseCase(this.itemRepository).deleteItem(userId, itemId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async findItemById(req: Request, res: any): Promise<void> {
        //@ts-ignore
        const itemId = req.params.id;
        try {
            const item = await new FindItemByIdUseCase(this.itemRepository).findItemById(itemId);
            if (!item) return res.status(404).json({ error: 'Item not found' });
            res.status(200).json(item);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async getItems(req: Request, res: any): Promise<void> {
        //@ts-ignore
        const pagination = req.query.pagination;
        if (!pagination) return res.status(400).json({ error: 'Pagination is required' });
        try {
            const items = await new GetItemsUseCase(this.itemRepository).getItems(pagination);
            res.status(200).json(items);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async updateItem(req: Request, res: any): Promise<void> {
        //@ts-ignore
        const itemId = req.params.id;
        const item: any = req.body;
        try {
            const updatedItem = await new UpdateItemUseCase(this.itemRepository).updateItem(itemId, item);
            if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
            res.status(200).json(updatedItem);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async getCategories(req: Request, res: any): Promise<CategoryEntity[] | Error> {
        try {
            const categories = await new GetCategoriesUseCase(this.itemRepository).getCategories();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching categories' });
        }
    }

    public async searchItems(req: Request, res: any): Promise<void> {
        //@ts-ignore
        const query = req._parsedUrl.search;
        if (!query) return res.status(400).json({ error: 'Query is required' });
        try {
            const items = await new SearchItemsUseCase(this.itemRepository).searchItems(query);
            res.status(200).json(items);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async likeItemHandler(req, res): Promise<void> {
        const userId = req.user.id;
        const itemId = req.params.itemId;

        try {
            await new LikeItemUseCase(this.ratingRepository).execute({ userId, itemId });
            res.status(200).json({ message: "Item liked successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public async getLikesHandler(req, res): Promise<void> {
        const itemId = req.params.itemId;

        try {
            const likesCount = await this.ratingRepository.getRatingsByItemId(itemId);
            res.status(200).json({ likes: likesCount });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}