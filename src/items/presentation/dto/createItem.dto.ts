type CreateItemDto = {
    name: string;
    description: string;
    price: number;
    userId: string;
    categoryIds: string[];
}

export function isCreateItemDto(object: any): object is CreateItemDto {
    return 'name' in object &&
        typeof object.name === 'string' &&
        'description' in object &&
        typeof object.description === 'string' &&
        'price' in object &&
        typeof object.price === 'number' &&
        'userId' in object &&
        typeof object.userId === 'string' &&
        'categoryIds' in object &&
        Array.isArray(object.categoryIds)
}