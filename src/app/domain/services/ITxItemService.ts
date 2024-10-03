import { TransactionItem } from "../entities/txItems";

export default interface ITxItemService {
    createTxItem(transaction_id: string, item_id: number, quantity: number, cost: number): Promise<TransactionItem | undefined>;
    getTxItemsByTransactionID(transaction_id: string): Promise<TransactionItem[] | undefined>;
}