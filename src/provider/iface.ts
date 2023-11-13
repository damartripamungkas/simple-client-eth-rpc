export type TypeString0x = `0x${string}`;
export type TypeTxValue = TypeString0x | number | bigint;
export type TypeTrace = Array<"vmTrace" | "trace" | "stateDiff">;
export type TypeBlockNumber = string | "latest" | "pending";

export interface IfaceTxObjCall {
  to: TypeString0x;
  from?: TypeString0x;
  data?: TypeString0x;
  gas?: TypeTxValue;
  gasPrice?: TypeTxValue;
  value?: TypeTxValue;
}

export interface IfaceGetLogs {
  fromBlock?: string;
  toBlock?: string;
  address?: TypeString0x;
  topics?: string;
  blockHash?: TypeString0x;
}

export interface IfaceNewFilter {
  fromBlock?: TypeBlockNumber;
  toBlock?: TypeBlockNumber;
  address?: TypeString0x;
  topics?: string;
}

export interface IfaceTraceCall {
  from?: TypeString0x;
  to: TypeString0x;
  gas?: TypeTxValue;
  gasPrice?: TypeTxValue;
  value?: TypeTxValue;
  data?: TypeString0x;
}

export interface IfaceTraceFilter {
  fromBlock?: TypeBlockNumber;
  toBlock?: TypeBlockNumber;
  fromAddress?: TypeString0x;
  toAddress?: TypeString0x;
  after?: string;
  count?: string;
}

export interface IfaceTxObj {
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
  params: string[];
  formatReturn: any;
}
