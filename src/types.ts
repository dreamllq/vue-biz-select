export type ModelValueType = number | string;

export type FetchDataType = ()=>Promise<{value: number|string, label:string}[]>;