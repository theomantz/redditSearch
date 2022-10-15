import * as path from "path";
import { fetch } from "./utils";
import sendEmails from "./sendEmail";
import fs from "fs";

type ResponseJSON = {
  data: InnerResponseJSON;
};

type InnerResponseJSON = {
  title: string;
  selftext: string;
  created: number;
  url: string;
  author: string;
};

type ResponseType = {
  title: string;
  body: string;
  url: string;
  author: string;
};

type EmailJSON = {
  sender: string;
  emails: string[];
};

function getRedditTixData(url: string) {
  return fetch(url).then(
    (response) => response.data.data.children,
    (error) => console.debug(error)
  );
}

function filterFunction(arrayElement: string, filterString: string) {
  return arrayElement.toLowerCase().includes(filterString);
}

function filterResponse(
  filterString: string,
  responseJSONArray: Array<ResponseJSON>
): Array<ResponseType> {
  return responseJSONArray
    .filter(
      (element) =>
        filterFunction(element.data.selftext, filterString) ||
        filterFunction(element.data.title, filterString)
    )
    .map((element) => {
      return {
        title: element.data.title,
        body: element.data.selftext,
        author: element.data.author,
        url: element.data.url,
      };
    });
}

function responseToString(responses: Array<ResponseType>): string {
  return responses
    .map(
      (response) =>
        `title: ${response.title}, body: ${response.body}, author: ${response.author}, url: ${response.url} `
    )
    .toString();
}

function htmlStringListBuilder(responses: Array<ResponseType>): string {
  const responseString = responses
    .map((el) => innerObjectToHtmlString(el))
    .join("");
  return `
    <ul>
      ${responseString}
    </ul>
  `;
}

function innerObjectToHtmlString(response: ResponseType): string {
  return `
  <ul style="padding: 10px 5px">
    <li>Title: ${response.title}</li>
    <li>Body: <p>${response.body}</p></li
    <li>Author: ${response.author}</li>
    <li><a href=${response.url} target="_blank"> Link </a></li>
  </ul>
  `;
}

function responseToHtml(responses: Array<ResponseType>): string {
  return "<h1>Posts With Your Tickets</h1>" + htmlStringListBuilder(responses);
}

export default function main(
  url: string = "https://www.reddit.com/r/avesNYC_tix/new.json",
  filterString: string = "black coffee"
) {
  getRedditTixData(url).then((response) => {
    const filteredResponses = filterResponse(filterString, response);
    if (filteredResponses.length > 0) {
      fs.readFile(path.join(__dirname, "../.emails.json"), (err, data) => {
        if (err) return console.error(err);
        const emailJSON: EmailJSON = JSON.parse(data.toString());
        sendEmails(
          emailJSON.sender,
          emailJSON.emails,
          "Found Your Tickets!",
          responseToString(filteredResponses),
          responseToHtml(filteredResponses)
        );
      });
    }
  });
}
