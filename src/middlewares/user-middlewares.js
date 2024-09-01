import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-error.js";
import { ErrorResponse } from "../utils/common/index.js";
import WAValidator from "multicoin-address-validator";

function validateAddress(req, res, next) {
  const { userAddress } = req.params;
  let valid = WAValidator.validate(userAddress, "UNKNOWN TOKEN", {
    chainType: "ethereum",
  });
  if (!valid) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = new AppError(
      ["userAddress is found incorrect"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

export default { validateAddress };
