import mongoose from 'mongoose';

const userTransactionSchema = new mongoose.Schema(
  {
    userAddress: {
      type: String,
      required: true,
    },
    transactions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserTransactions = mongoose.model("User-Transactions", userTransactionSchema);

export default UserTransactions;