import { CategoryEntity, UserEntity } from '../../../models';
import ItemEntity from '../entity/Item.entity';
import RatingEntity from '../entity/Rating.entity';

export class RatingRepository {
    async createRating(userId: string, itemId: string): Promise<RatingEntity> {
        return RatingEntity.create({ userId, itemId });
    }

    async getRatingsByItemId(itemId: string): Promise<number> {
        return RatingEntity.count({ where: { itemId } });
    }

    async userHasRatedItem(userId: string, itemId: string): Promise<boolean> {
        const rating = await RatingEntity.findOne({ where: { userId, itemId } });
        return !!rating;
    }

    public async getLikedItemsByUser(userId: string): Promise<ItemEntity[]> {
        const likedItems = await RatingEntity.findAll({
            where: { userId },
            include: [
                {
                    model: ItemEntity,
                    as: "item",
                    include: [
                        { model: UserEntity, as: "user", attributes: ["id", "firstname", "lastname"] },
                        { model: CategoryEntity, as: "categories", attributes: ["id", "name"] },
                    ],
                },
            ],
        });
        return likedItems.map((rating) => rating.item);
    }
    
}
