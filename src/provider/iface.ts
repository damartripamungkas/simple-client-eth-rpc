export type TypeTxValue = string | number | bigint;
export type TypeTrace = Array<"vmTrace" | "trace" | "stateDiff">;
export type TypeBlockNumber = string | "latest" | "pending";

export interface IfaceTxObjCall {
  to: string;
  from?: string;
  data?: string;
  gas?: TypeTxValue;
  gasPrice?: TypeTxValue;
  value?: TypeTxValue;
}

export interface IfaceGetLogs {
  fromBlock?: string;
  toBlock?: string;
  address?: string;
  topics?: string;
  blockHash?: string;
}

export interface IfaceNewFilter {
  fromBlock?: TypeBlockNumber;
  toBlock?: TypeBlockNumber;
  address?: string;
  topics?: string;
}

export interface IfaceTraceCall {
  from?: string;
  to: string;
  gas?: TypeTxValue;
  gasPrice?: TypeTxValue;
  value?: TypeTxValue;
  data?: string;
}

export interface IfaceTraceFilter {
  fromBlock?: TypeBlockNumber;
  toBlock?: TypeBlockNumber;
  fromAddress?: string;
  toAddress?: string;
  after?: string;
  count?: string;
}

export interface IfaceTxObj {
  to?: string;
  from?: string;
  data?: string;
  gasLimit?: TypeTxValue;
  gasPrice?: TypeTxValue;
  maxFeePerGas?: TypeTxValue;
  maxPriorityFeePerGas?: TypeTxValue;
  value?: TypeTxValue;
  nonce?: TypeTxValue;
  chainId?: TypeTxValue;
}

export interface IfaceTraceObject {
  tracer: "callTracer" | "prestateTracer";
  tracerConfig: { onlyTopCall: boolean };
}

export interface IfaceReconnectOpt {
  autoReconnect?: boolean | true;
  delay?: number | 500;
  maxAttempts?: number;
}

export interface IfaceSend {
  method: string;
  params: any[];
  formatReturn?: any;
}

export interface InterfaceCallback {
  (...args: any): void;
}
