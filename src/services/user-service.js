import { StatusCodes } from "http-status-codes";
// import { User } from "../models/user.mjs";
import AppError from "../utils/errors/app-error.js";
import { ServerConfig } from "../config/index.js";
import axios from "axios";

async function fetchTransactions(data) {
  try {
    // console.log(data);
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${data.userAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${data.apiKey}`;
    const response = await axios.get(url);
    // console.log(response.data.result);
    const result = response.data.result;
    return result;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch user transactions",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export default {
  fetchTransactions,
};
