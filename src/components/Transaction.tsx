import { useDispatch } from 'react-redux';
import { deleteTransaction, type Transaction } from '../features/transactions/transactionsSlice';

interface TransactionProps {
  transaction: Transaction;
}

export default function Transaction({ transaction }: TransactionProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction));
  };

  return (
    <li className="new-transaction">
      <span>
        {transaction.amount} – {transaction.category}{' '}
        <span className="description">( {transaction.description} )</span>
      </span>
      <button onClick={handleDelete} aria-label="Remove">
        X
      </button>
    </li>
  );
}
