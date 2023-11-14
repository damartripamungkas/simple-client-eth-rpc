import EthMethods from "./eth";
import { intervalReturn } from "node-interval-return";
import { InterfaceCallback } from "./iface";

export default class {
  #ethSend: EthMethods;
  #ethBuild: EthMethods;
  #sendBatch: any;
  constructor(initEthSend: any, initEthBuild: any, sendBatch: any) {
    this.#ethSend = initEthSend;
    this.#ethBuild = initEthBuild;
    this.#sendBatch = sendBatch;
  }

  getGasPriceLevel = async () => {
    const { transactions } = await this.#ethSend.eth_getBlockByNumber("latest", false);
    const arrGasPrice = transactions.map((it: any) => BigInt(it.gasPrice));
    const totalValGasPrice = arrGasPrice.reduce((total: any, nilai: any) => total + nilai);
    const lengthArrGasPrice = arrGasPrice.length;
    return {
      veryHigh: arrGasPrice[0], // BigInt
      average: totalValGasPrice / lengthArrGasPrice, // BigInt
      veryLow: arrGasPrice[lengthArrGasPrice - 1], // BigInt
    };
  };

  isSmartContract = async (address: string) => {
    const res = await this.#ethSend.eth_getCode(address, "latest");
    if (res == "0x") {
      throw `address is not smartcontract`;
    }

    return res;
  };

  waitTransactionReceipt = async (hash: string, intervalMs: number | 2500) => {
    const receipt: any = await intervalReturn(intervalMs, true, async (resolve) => {
      const res = await this.#ethSend.eth_getTransactionReceipt(hash);
      if (res !== null) {
        resolve(res);
      }
    });

    receipt.status = receipt.status == 1 ? "success" : "failed";
    return receipt;
  };

  batchWaitTransactionReceipt = async (hash: string[], intervalMs: number | 2500, callbackRes: InterfaceCallback) => {
    for (let index = 0; index < hash.length; index++) {
      callbackRes(await this.waitTransactionReceipt(hash[index], intervalMs), index);
    }
  };

  batchSendRawTransaction = async (signTx: string[]) => {
    const buildRes = signTx.map((it) => this.#ethBuild.eth_sendRawTransaction(it));
    const sendBatch = await this.#sendBatch(...buildRes);
    return sendBatch;
  };
}
