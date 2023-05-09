export type ModelValueType = number | string;

export type FetchDataType = (query?:string)=>Promise<{value: number|string, label:string}[]>;