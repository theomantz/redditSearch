import * as path from "path";
import { SES, AWSError, Config } from "aws-sdk";
import { SendEmailRequest, SendEmailResponse } from "aws-sdk/clients/ses";

const config = new Config();

const sesConfig = config.loadFromPath(path.join(__dirname, "../.config.json"));

const ses = new SES(sesConfig);

function createParams(
  sender: string,
  recipients: Array<string>,
  subject: string,
  body: string,
  html: string
): SendEmailRequest {
  return {
    Source: sender,
    Destination: {
      ToAddresses: recipients,
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: body,
        },
        Html: {
          Data: html,
        },
      },
    },
  };
}

export default function sendEmails(
  sender: string,
  recipients: Array<string>,
  subject: string,
  body: string,
  html: string
) {
  const params = createParams(sender, recipients, subject, body, html);

  ses.sendEmail(params, (err: AWSError, data: SendEmailResponse) => {
    if (err) console.debug(err, err.stack);
    else console.log(data);
  });
}
