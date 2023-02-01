//Written by Akshit Yeddala

//import for fetch
import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+

//import for URL
import { URL } from "node:url"; // Import the URL class from the url library

//Weather API: https://api.open-meteo.com/v1/forecast

//helper function to make search URL
export function makeWSearchURL(lon, lat) {
  // Construct a new URL object using the API URL
  const searchURL = new URL("https://api.open-meteo.com/v1/forecast");

  // Access the searchParams field of the constructed url
  // The field holds an instance of the URLSearchParams
  // Add new "longitude" and "latitude" parameters with the value of the inputs
  searchURL.searchParams.append("longitude", lon);
  searchURL.searchParams.append("latitude", lat);

  // Set "hourly" and "temperature_unit" parameters to their respective values according to the instructions
  searchURL.searchParams.append("hourly", "temperature_2m");
  searchURL.searchParams.append("temperature_unit", "fahrenheit");

  return searchURL.toString(); // Return the resulting complete URL
}

//takes in a longitude and latitude and returns a promise that resolves to an object with two properties: the weather data and corresponding time data in arrays
//fetchCurrentWeather(longitude: number, latitude: number): Promise<{ time: string[], temperature_2m: number[] }>
export function fetchCurrentWeather(longitude, latitude) {
  //check coords are nums
  if (typeof longitude !== "number" || typeof latitude !== "number") {
    return Promise.reject(
      new Error("Longitude and/or latitude is not a number")
    );
  }
  //check coords are valid
  if (Math.abs(longitude) > 180 || Math.abs(latitude) > 90) {
    return Promise.reject(new Error("Longitude and/or latitude is not valid"));
  }

  // Make specific search URL
  const searchURL = makeWSearchURL(longitude, latitude);

  //fetch the /v1 resource with "forecast" parameters
  return fetch(searchURL)
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject(new Error(response.statusText))
    ) //parse result to json if response.ok is true
    .then((json) => {
      let h = json.hourly;
      let ti = json.hourly.time;
      let te = json.hourly.temperature_2m;
      //this API returns an object with an "hourly" field as an object with noth a "time" field as an array of string objects, and a "temperature_2m" field as an array of number objects
      if (
        Array.isArray(ti) &&
        ti.length > 0 &&
        Array.isArray(te) &&
        te.length > 0
      ) {
        //Resolved with an object with array of string objects and an array of number objects
        return Promise.resolve({ time: ti, temperature_2m: te });
      } else {
        //reject if nothing is present
        return Promise.reject(
          new Error("No results found for given longitude and latitude.")
        );
      }
    })
    .then((o) => o)
    .catch((err) => new Promise.reject(err));
}
