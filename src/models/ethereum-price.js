import mongoose from "mongoose";

const ethereumPriceSchema = new mongoose.Schema(
  {
    network: {
      type: String,
      required: true,
      default: "ethereum"
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EthereumPrice = mongoose.model(
  "Ethereum-Price",
  ethereumPriceSchema
);

export default EthereumPrice;
