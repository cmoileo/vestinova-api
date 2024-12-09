export class ItemModel {
    public name: string | undefined;
    public description: string | undefined;
    public price: number | undefined;
    public userId: string | undefined;
    public imageId: string | undefined;
    public categoryIds: string[] | undefined;
    public imageUrl: string | undefined;
    public file: File | undefined

    public setName(name: string): void | Error {
        if (name.length < 2) {
            return new Error("Name is too short");
        }
        if (name.length > 30) {
            return new Error("Name is too long");
        }
        this.name = name;
    }

    public setDescription(description: string): void | Error {
        if (description.length < 2) {
            return new Error("Description is too short");
        }
        if (description.length > 255) {
            return new Error("Description is too long");
        }
        this.description = description;
    }

    public setPrice(price: number): void | Error {
        if (price < 0) {
            return new Error("Price must be greater than 0");
        }
        this.price = price;
    }

    public setUserId(userId: string): void | Error {
        if (userId.length !== 36) {
            return new Error("User ID is too short or too long");
        }
        this.userId = userId;
    }

    public setImagesId(image: string): void {
        this.imageId = image;
    }

    public setImageUrl(path: string): void {
        this.imageUrl = path;
    }

    public setCategoryIds(categories: string[]): void {
        this.categoryIds = categories;
    }
}