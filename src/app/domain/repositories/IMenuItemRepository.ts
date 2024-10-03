import { MenuItem } from "../entities/menuItem";

export default interface IMenuItemRepository {
    createMenuItem(name: string, cost: number, description: string, allergens: string): Promise<MenuItem>;
    getMenuItemByID(item_id: number): Promise<MenuItem | undefined>;
}