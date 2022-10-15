"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const config = new aws_sdk_1.Config();
const sesConfig = config.loadFromPath(".config.json");
const ses = new aws_sdk_1.SES(sesConfig);
function createParams(sender, recipients, subject, body, html) {
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
function sendEmails(sender, recipients, subject, body, html) {
    const params = createParams(sender, recipients, subject, body, html);
    ses.sendEmail(params, (err, data) => {
        if (err)
            console.debug(err, err.stack);
        else
            console.log(data);
    });
}
exports.default = sendEmails;
//# sourceMappingURL=sendEmail.js.map