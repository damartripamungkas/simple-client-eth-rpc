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

  getGasPriceLevel = async (blockNumber: string) => {
    const { transactions } = await this.#ethSend.eth_getBlockByNumber(blockNumber, true);
    const arrGasPrice = transactions.map((it: any) => it.gasPrice);
    const lengthArrGasPrice = arrGasPrice.length;
    return {
      get all() {
        return arrGasPrice.reduce((acc: any, cur: any) => BigInt(acc) + BigInt(cur), 0);
      },
      get top() {
        return BigInt(arrGasPrice[0]);
      },
      get mid() {
        return BigInt(arrGasPrice[lengthArrGasPrice / 2]);
      },
      get bottom() {
        return BigInt(arrGasPrice[lengthArrGasPrice - 1]);
      },
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
