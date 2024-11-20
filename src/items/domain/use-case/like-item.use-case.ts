import { RatingRepository } from "../../infrastructure/repository/RatingRepository";

export class LikeItemUseCase {
    constructor(
        private readonly ratingRepository: RatingRepository
    ) {}

    async execute(data: { userId: string, itemId: string }): Promise<void | Error> {
        const hasRated = await this.ratingRepository.userHasRatedItem(data.userId, data.itemId);
        
        if (hasRated) {
            throw new Error("User has already rated this item");
        }

        await this.ratingRepository.createRating(data.userId, data.itemId);
    }
}
