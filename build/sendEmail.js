"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const aws_sdk_1 = require("aws-sdk");
const config = new aws_sdk_1.Config();
const sesConfig = config.loadFromPath(path.join(__dirname, "../.config.json"));
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