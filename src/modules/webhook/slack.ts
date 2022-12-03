import { IncomingWebhook } from "@slack/webhook";
import Queue from "bull";
import { Manager } from "../../server/app/app";
import { Config } from "../config/server-config";

export type webhookError = {
  processError: string;
  message: string;
  stackTrace: any;
};

export class SlackWebhook implements Manager<webhookError> {
  private instance: IncomingWebhook;
  private queue: Queue.Queue<webhookError>;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.instance = new IncomingWebhook(config.slackWebhookUrl, {
      username: config.slackUsername,
      icon_url: config.slackIconUrl,
      channel: config.slackChannel,
    });

    this.queue = new Queue("slack-error-queue");
    this.processQueue();
  }

  public notify(msg: webhookError) {
    this.queue.add(msg);
  }

  private processQueue() {
    this.queue.process((job) => {
      const errorData: webhookError = job.data;

      try {
        this.instance.send({
          text: errorData.processError,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Process name : ${errorData.processError}*`,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Error : *\n" + "```" + errorData.message + "```",
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text:
                  "*Stack Trace : *\n" + "```" + errorData.stackTrace + "```",
              },
            },
          ],
        });
        return Promise.resolve();
      } catch (err) {
        console.log(err);
      }
    });
  }
}
