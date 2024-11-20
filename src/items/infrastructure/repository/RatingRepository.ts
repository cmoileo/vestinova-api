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
}
