export type IDebug = (msg: string, stack?: any) => void;

export type MessageAttributes = IMessageAttribute[];

export interface IMessageAttribute {
  Type: string;
  Value: string;
}
