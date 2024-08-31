import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import axios from "axios";
import UserTransactions from "../models/user-transactions.js";

async function fetchTransactions(data) {
  try {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${data.userAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${data.apiKey}`;
    const response = await axios.get(url);
    const result = response.data.result;
    saveTransactions({
      userAddress: data.userAddress,
      transactions: JSON.stringify(result),
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch user transactions",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function saveTransactions(data) {
  try {
    const findUser = await UserTransactions.findOne({
      userAddress: data.userAddress,
    });
    if (findUser) {
      await UserTransactions.findOneAndUpdate(
        { userAddress: data.userAddress },
        data.transactions
      );
      return;
    }
    const user = await UserTransactions.create(data);
    console.log(user);
  } catch (error) {
    console.log(error);
    if (error.statusCode == StatusCodes.BAD_REQUEST) {
      throw new AppError(
        "Given User object already exists",
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      "Cannot create a new user object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export default {
  fetchTransactions,
};
