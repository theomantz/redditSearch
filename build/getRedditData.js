"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const sendEmail_1 = __importDefault(require("./sendEmail"));
function getRedditTixData(url) {
    return (0, utils_1.fetch)(url).then((response) => response.data.data.children, (error) => console.debug(error));
}
function filterFunction(arrayElement, filterString) {
    return arrayElement.toLowerCase().includes(filterString);
}
function filterResponse(filterString, responseJSONArray) {
    return responseJSONArray
        .filter((element) => filterFunction(element.data.selftext, filterString) ||
        filterFunction(element.data.title, filterString))
        .map((element) => {
        return {
            title: element.data.title,
            body: element.data.selftext,
            author: element.data.author,
            url: element.data.url,
        };
    });
}
function responseToString(responses) {
    return responses
        .map((response) => `title: ${response.title}, body: ${response.body}, author: ${response.author}, url: ${response.url} `)
        .toString();
}
function htmlStringListBuilder(responses) {
    const responseString = responses
        .map((el) => innerObjectToHtmlString(el))
        .join("");
    return `
    <ul>
      ${responseString}
    </ul>
  `;
}
function innerObjectToHtmlString(response) {
    return `
  <ul style="padding: 10px 5px">
    <li>Title: ${response.title}</li>
    <li>Body: <p>${response.body}</p></li
    <li>Author: ${response.author}</li>
    <li><a href=${response.url} target="_blank"> Link </a></li>
  </ul>
  `;
}
function responseToHtml(responses) {
    return "<h1>Posts With Your Tickets</h1>" + htmlStringListBuilder(responses);
}
function main(url = "https://www.reddit.com/r/avesNYC_tix/new.json", filterString = "black coffee") {
    getRedditTixData(url).then((response) => {
        const filteredResponses = filterResponse(filterString, response);
        if (filteredResponses.length > 0) {
            (0, sendEmail_1.default)("alerts@alerts.mantz.nyc", ["theo@mantz.nyc"], "Found Your Tickets!", responseToString(filteredResponses), responseToHtml(filteredResponses));
        }
    });
}
exports.default = main;
//# sourceMappingURL=getRedditData.js.map