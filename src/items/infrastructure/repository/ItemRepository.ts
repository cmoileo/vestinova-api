import {IItemRepository} from "./IItemRepository";
import ItemEntity from "../entity/Item.entity";
import CategoryEntity from "../entity/Category.entity";
import {col, fn, Op, Sequelize} from 'sequelize';
import sequelize from "../../../../sequelize.config";

export class ItemRepository implements IItemRepository {
    async createItem(item: any): Promise<ItemEntity> {
        const newItem = await ItemEntity.create(item);
        if (item.categoryIds && item.categoryIds.length > 0) {
            const categories = await CategoryEntity.findAll({
                where: {
                    id: item.categoryIds
                }
            });
        }
        return newItem;
    }
    async deleteItem(id: string): Promise<void> {
        await ItemEntity.destroy({where: {id}});
    }
    async findItemById(id: string): Promise<ItemEntity | null> {
        return await ItemEntity.findByPk(id);
    }
    async findAllItems(pagination: any): Promise<ItemEntity[]> {
        return await ItemEntity.findAll(
            {
                limit: pagination,
                include: {
                    model: CategoryEntity,
                    attributes: ['isParent', 'name', "parentId"]
                }
            }
        );
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
        const brand = searchParams.getAll('brand');
        const type = searchParams.getAll('type');
        const size = searchParams.getAll('size');
        const color = searchParams.getAll('color');
        const sexe = searchParams.getAll('sexe');
        const priceRange = searchParams.get('priceRange');
        const count = Number(searchParams.get('count')) || 10;

        const whereClause: any = {};
        const categoryWhereClause: any = [];

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


        const items = await ItemEntity.findAll({
            include: [
                {
                    model: CategoryEntity,
                    required: true,
                    through: { attributes: [] },
                    where: {
                        [Op.or]: categoryWhereClause
                    },
                },
            ],
            group: ['ItemEntity.id'],
            limit: count,
        });
        // @ts-ignore
        return items.filter(item => item.CategoryEntities.length === categoryWhereClause.length);
    }
}