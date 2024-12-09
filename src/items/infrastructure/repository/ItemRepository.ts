import {IItemRepository} from "./IItemRepository";
import ItemEntity from "../entity/Item.entity";
import CategoryEntity from "../entity/Category.entity";
import {col, fn, Op, Sequelize} from 'sequelize';
import UserEntity from "../../../authentication/infrastructure/entity/User.entity";

export class ItemRepository implements IItemRepository {
    async createItem(item: any): Promise<ItemEntity> {
        const createdItem = await ItemEntity.create(item)
        const categoryIds = item.categoryIds;
        if (categoryIds && categoryIds.length > 0) {
            const categories = await CategoryEntity.findAll({
                where: {
                    id: {
                        [Op.in]: categoryIds
                    }
                }
            });
            try {
                await createdItem.addCategories(categories);
            } catch (e) {
                console.log(e)
                throw e;
            }
        }
        return createdItem
    }
    async deleteItem(id: string): Promise<void> {
        await ItemEntity.destroy({where: {id}});
    }
    async findItemById(id: string): Promise<ItemEntity | null> {
        return await ItemEntity.findByPk(id, {
            include: [
                {
                    model: CategoryEntity,
                    as: 'categories',
                },
                {
                    model: UserEntity,
                    as: 'user',
                },
            ],
        });
    }
    async findAllItems(pagination: number): Promise<ItemEntity[]> {
        const limit = 9;
        const offset = (pagination - 1) * limit;

        return await ItemEntity.findAll({
            limit: limit,
            offset: offset,
            include: {
                model: CategoryEntity,
                as: 'categories',
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
    }

    async updateItem(id: string, item: ItemEntity): Promise<ItemEntity | null> {
        await ItemEntity.update(item, {where: {id}});
        return await ItemEntity.findByPk(id);
    }

    async getCategories(): Promise<CategoryEntity[]> {
        return await CategoryEntity.findAll();
    }

    async searchItems(search: string): Promise<any> {
        const searchParams = new URLSearchParams(search);
        let name = searchParams.get('search');
        const brand = searchParams.getAll('brand');
        const type = searchParams.getAll('type');
        const size = searchParams.getAll('size');
        const color = searchParams.getAll('color');
        const sexe = searchParams.getAll('sexe');
        const priceRange = searchParams.get('priceRange');
        const count = Number(searchParams.get('count')) || 10;

        // @ts-ignore
        name = name.length > 0 ? name : null;

        const whereClause: any = {};
        const categoryWhereClause: any = [];

        if (name) {
            whereClause['name'] = { [Op.iLike]: `%${name}%` };
        }

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            whereClause['price'] = { [Op.between]: [minPrice, maxPrice] };
        }
        if (brand.length > 0) {
            categoryWhereClause.push({
                name: { [Op.in]: brand[0].split(',') },
                parentId: 4
            });
        }
        if (type.length > 0) {
            categoryWhereClause.push({
                name: { [Op.in]: type[0].split(',') },
                parentId: 1
            });
        }
        if (size.length > 0) {
            categoryWhereClause.push({
                name: { [Op.in]: size[0].split(',') },
                parentId: 3
            });
        }
        if (color.length > 0) {
            categoryWhereClause.push({
                name: { [Op.in]: color[0].split(',') },
                parentId: 2
            });
        }
        if (sexe.length > 0) {
            categoryWhereClause.push({
                name: { [Op.in]: sexe[0].split(',') },
                parentId: 28
            });
        }

        let items

        if (categoryWhereClause.length === 0 && !name) {
            items = await ItemEntity.findAll({
                group: ['ItemEntity.id'],
                limit: count,
                having: Sequelize.where(Sequelize.col('name'), name)
            });
        }
        if (categoryWhereClause.length === 0 && name) {
            items = await ItemEntity.findAll({
                where: whereClause,
                group: ['ItemEntity.id'],
                limit: count,
            });
        }

        if (categoryWhereClause.length > 0 && !name) {
            items = await ItemEntity.findAll({
                include: [
                    {
                        model: CategoryEntity,
                        required: true,
                        as: 'categories',
                        through: { attributes: [] },
                        where: {
                            [Op.or]: categoryWhereClause,
                        },
                    },
                ],
                group: ['ItemEntity.id'],
                limit: count,
            });
        }

        if (categoryWhereClause.length > 0 && name) {
            items = await ItemEntity.findAll({
                where: whereClause,
                include: [
                    {
                        model: CategoryEntity,
                        required: true,
                        as: 'categories',
                        through: { attributes: [] },
                        where: {
                            [Op.or]: categoryWhereClause,
                        },
                    },
                ],
                group: ['ItemEntity.id'],
                limit: count,
            });
        }

        if (!items) {
            return [];
        }

        return items.filter(item => {
            if (categoryWhereClause.length === 0) {
                return true;
            }
            // @ts-ignore
            return item.categories.length === categoryWhereClause.length;
        });
    }

    public async getItemsCount(): Promise<number> {
        return await ItemEntity.count();
    }
}