import { TransactionItem } from "../entities/txItems";

export default interface ITxItemRepository {
    createTxItem(transaction_id: string, item_id: number, quantity: number, cost: number ): Promise<TransactionItem>
    getTxItemsByTransactionID(transaction_id: string): Promise<TransactionItem[] | undefined>
}