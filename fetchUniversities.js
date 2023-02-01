// Written by Benjamin Wong
// Takes in a query string and returns a Promise that fulfills with an array of university names.
// Utilizes the API found here: https://university-web-api.herokuapp.com/search?name=University+of+Massachusetts

import { URL } from "node:url"; // Import the URL class from the url library

// fetchUniversities(query: string): Promise<string[]>
export function fetchUniversities(query) {
  // helper function to create the url for the search query.
  function queryToURL(query) {
    // Create a new URL that is the base api search URL.
    let searchURL = new URL("https://university-web-api.herokuapp.com/search?");

    // Search for objects with who have the query in the name field.
    searchURL.searchParams.append("name", query);

    // Return the resulting complete URL
    return searchURL.toString();
  }

  return fetch(queryToURL(query)) // fetch our query
    .then((response) =>
      response.ok
        ? response.json()
        : new Promise.reject(new error(response.statusText))
    ) // if successful, convert it into a json, which should be an array of objects
    .then((json) => {
      // create an array to write into.
      let array = [];

      // Now that our array is only composed of those whose names start with the query, add every name to our result list.
      json.forEach((x) => array.push(x.name));

      // have this function return a resolved promise with our array of names.
      return Promise.resolve(array);
    })
    .catch((err) => new Promise.reject(err)); // catch if fetch results fail.
}
