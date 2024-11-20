import {ItemModel} from "../model/item.model";
import ItemEntity from "../../infrastructure/entity/Item.entity";
import {ImageStorageService} from "../../../shared/service/imageStorage.service";
import {IItemRepository} from "../../infrastructure/repository/IItemRepository";
import {ItemRepository} from "../../infrastructure/repository/ItemRepository";

export class CreateItemUseCase {
    private readonly itemRepository: ItemRepository;
    private readonly imageStorageService: ImageStorageService;
    constructor(itemRepository: ItemRepository) {
        this.itemRepository = itemRepository;
        this.imageStorageService = new ImageStorageService();
    }
    public async execute(item: ItemModel, userId: string, images: File[]): Promise<ItemEntity | Error> {
        try {
            const newItem = new ItemModel()
             if (typeof item === "string") item = JSON.parse(item);

            if (images) {
                let imageIds = [];
                imageIds = await Promise.all(images.map(image => this.imageStorageService.uploadImage(image)));
                newItem.setImagesIds(imageIds);
            }
            if (item.categoryIds) {
                newItem.setCategoryIds(item.categoryIds);
            }
            if (!item.name || !item.description || !item.price) {
                return new Error("Missing required fields");
            }
            const nameError = newItem.setName(item.name);
            if (nameError instanceof Error) {
                return nameError;
            }
            const descriptionError = newItem.setDescription(item.description);
            if (descriptionError instanceof Error) {
                return descriptionError;
            }
            const priceError = newItem.setPrice(Number(item.price));
            if (priceError instanceof Error) {
                return priceError;
            }
            const userIdError = newItem.setUserId(userId);
            if (userIdError instanceof Error) {
                return userIdError;
            }
            return await this.itemRepository.createItem(newItem);
        } catch (error) {
            throw error;
        }
    }
}