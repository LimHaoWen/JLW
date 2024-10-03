import { Transaction } from "../entities/transaction";

export default interface ITransactionalRepository {
    createTransaction(user_id: number, totalcost: number): Promise<Transaction>
    getTransactionByTransactionID(transaction_id: string): Promise<Transaction | undefined>
    getTransactionsByUserID(user_id: number): Promise<Transaction | undefined>
}