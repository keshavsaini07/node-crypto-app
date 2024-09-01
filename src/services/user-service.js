import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import axios from "axios";
import UserTransactions from "../models/user-transactions.js";
import { ServerConfig } from "../config/index.js";
import EthereumPrice from "../models/ethereum-price.js";

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

    // console.log(user);
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot create a new user object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function fetchEthereumPrice() {
  try {
    const response = await axios.get(ServerConfig.ETHEREUM_PRICE_URL);
    const price = response.data.ethereum.inr;

    const findEthereum = await EthereumPrice.findOne({ network: "ethereum" });

    if (findEthereum) {
      findEthereum.price = price;
      await findEthereum.save();
      return;
    }

    const id = await EthereumPrice.create({
      network: "ethereum",
      price: price,
    });
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch Ethereum price",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function fetchTotalExpense(data) {
  try {
    const findUser = await UserTransactions.findOne({
      userAddress: data.userAddress,
    });

    const price = (
      await EthereumPrice.findOne({
        network: "ethereum",
      })
    ).price;

    if (findUser && price) {
      let transactions = JSON.parse(findUser.transactions);
      let totalExpense = 0;
      transactions.map((transaction) => {
        let gasUsed = parseFloat(transaction.gasUsed);
        let gasPrice = parseFloat(transaction.gasPrice);
        let expense = (gasUsed * gasPrice) / 1e18;
        totalExpense += expense;
      });
      // console.log(totalExpense, price);
      return { totalExpenses: parseFloat(totalExpense.toFixed(6)), currentPrice: price };
    }
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch total expense and ethereum price",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export default {
  fetchTransactions,
  fetchEthereumPrice,
  fetchTotalExpense,
};
