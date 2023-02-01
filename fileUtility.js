import { readFile, writeFile } from "node:fs/promises";
import { workerData } from "node:worker_threads";

export function writeToJSONFile(path, data) {
  //This function should take in a file path (path) and some data (data), and return a Promise that fulfils when the JSON representation of data is written to a file located at path. Use writeFile from the fs/promises library. use json.stringify. The type specification is as follows writeToJSONFile(path: string, data: object | object[]): Promise<void>
  //type specification is writeToJSONFile(path: string, data: object | object[]): Promise<void>

  return Promise.resolve(writeFile(path, JSON.stringify(data, null, 2))).catch(
    (error) => {
      new Promise.reject(error);
    }
  );
}

export function readFromJSONFile(path) {
  // This function should take in a path to a file (assumed to be JSON data), and return a Promise that fulfils with the parsed contents of the file. Use readFile from the fs/promises library. Use JSON.parse. The type specification is as follows readFromJSONFile(path: string): Promise<object | object[]>
  //readFromJSONFile(path: string): Promise<object | object[]>

  return Promise.resolve(readFile(path, "utf-8"))
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((error) => {
      new Promise.reject(error);
    });
}

//Benjamin wrote the writeFile function by himself whereas Talish and Akshit worked on the readFromJSON file.
