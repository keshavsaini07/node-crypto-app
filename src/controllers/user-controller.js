import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";
import { ServerConfig } from "../config/index.js"
import { UserService } from "../services/index.js";

async function fetchTransactions(req, res) {
  try {
    const user = await UserService.fetchTransactions({
        userAddress: req.body.userAddress || ServerConfig.USER_ADDRESS,
        apiKey: ServerConfig.API_KEY
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error)
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function fetchTotalExpense(req, res) {
  try {
    const expense = await UserService.fetchTotalExpense({
      userAddress: req.body.userAddress || ServerConfig.USER_ADDRESS
    });
    SuccessResponse.data = expense;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

export default {
  fetchTransactions,
  fetchTotalExpense
};