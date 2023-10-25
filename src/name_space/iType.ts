export type TypeString0x = `0x${string}`;
export type TypeTxValue = TypeString0x | number | bigint;
export type TypeTrace = Array<"vmTrace" | "trace" | "stateDiff">;
export type TypeBlockNumber = string | "latest" | "pending";

export interface InterfaceTxObjCall {
  to: TypeString0x;
  from?: TypeString0x;
  data?: TypeString0x;
  gas?: TypeTxValue;
  gasPrice?: TypeTxValue;
  value?: TypeTxValue;
}

export interface InterfaceGetLogs {
  fromBlock?: string;
  toBlock?: string;
  address?: TypeString0x;
  topics?: string;
  blockHash?: TypeString0x;
}

export interface InterfaceNewFilter {
  fromBlock?: TypeBlockNumber;
  toBlock?: TypeBlockNumber;
  address?: TypeString0x;
  topics?: string;
}

export interface InterfaceTraceCall {
  from?: TypeString0x;
  to: TypeString0x;
  gas?: TypeTxValue;
  gasPrice?: TypeTxValue;
  value?: TypeTxValue;
  data?: TypeString0x;
}

export interface InterfaceTraceFilter {
  fromBlock?: TypeBlockNumber;
  toBlock?: TypeBlockNumber;
  fromAddress?: TypeString0x;
  toAddress?: TypeString0x;
  after?: string;
  count?: string;
}

export interface InterfaceTxObj {
  to?: TypeString0x;
  from?: TypeString0x;
  data?: TypeString0x;
  gasLimit?: TypeTxValue;
  gasPrice?: TypeTxValue;
  maxFeePerGas?: TypeTxValue;
  maxPriorityFeePerGas?: TypeTxValue;
  value?: TypeTxValue;
  nonce?: TypeTxValue;
  chainId?: TypeTxValue;
}

export interface InterfaceTraceObject {
  tracer: "callTracer" | "prestateTracer";
  tracerConfig: { onlyTopCall: boolean };
}
