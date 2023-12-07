import { Handler } from "aws-lambda";
import {
  ListSubscriptionsResponse,
  CreateTopicResponse,
  PublishResponse,
  ListTopicsResponse,
} from "aws-sdk/clients/sns.d.js";
import { Event, FunctionDefinition } from "serverless";

export type IDebug = (msg: string, stack?: any) => void;

export interface ISNSAdapter {
  listTopics(): Promise<ListTopicsResponse>;
  listSubscriptions(): Promise<ListSubscriptionsResponse>;
  unsubscribe(arn: string): Promise<void>;
  createTopic(topicName: string): Promise<CreateTopicResponse>;
  subscribe(
    fn: FunctionDefinition,
    handler: Handler<Event>,
    arn: string,
    snsConfig: any,
  ): Promise<void>;
  subscribeQueue(queueUrl: string, arn: string, snsConfig: any): Promise<void>;
  publish(topicArn: string, message: string): Promise<PublishResponse>;
}

export type ISNSAdapterConstructable = new (
  endpoint: string,
  port: number,
  region: string,
  debug: IDebug,
) => ISNSAdapter;

export interface ISNSServer {
  routes();
}

export type MessageAttributes = IMessageAttribute[];

export interface IMessageAttribute {
  Type: string;
  Value: string;
}
