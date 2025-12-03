import Transaction from './Transaction';
import type { Transaction as TransactionType } from '../features/transactions/transactionsSlice';

interface TransactionListProps {
  transactions: TransactionType[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <section className="new-transactions-section">
      <h2>Transactions</h2>
      <ul className="new-transaction-list">
        {transactions.map((t) => (
          <Transaction transaction={t} key={t.id} />
        ))}
      </ul>
    </section>
  );
}
