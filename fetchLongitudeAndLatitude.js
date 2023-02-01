//written by Talish Garg
import fetch from "node-fetch";
import path from "path";

export function fetchLongitudeAndLatitude(query) {
  //This function should take in a query string and return a Promise that fulfils with an object. The object should have a field lon and a field lat - corresponding to the longitude and latitude result of the query. If there are multiple results for a query, pick the first one. If there are no results for a location (the result array is empty), then the promise should reject with an error identical to the one below: new Error("No results found for query."); Use the following API to https://geocode.maps.co/search?q=query retrieve your results. The base URL should be "https://geocode.maps.co/search" and there should be one URL search parameter "q. This API returns an array of objects containing a lon and lat field. Use Promise.resolve and Promise.reject. Return an object with 2 fields lat and lon which are Numbers. Assert result should be object. Assert lon value is a number. Assert lat value is a number. Assert there are only two keys in the object.
  return fetch(`https://geocode-cache.herokuapp.com/search?q=${query}`) // fetch the data from the API
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject(new Error("No results found for query."))
    ) // if the response is ok, return the response as json, otherwise reject the promise with an error
    .then((data) => {
      if (data.length === 0) {
        return Promise.reject(new Error("No results found for query."));
      }
      return Promise.resolve({
        lon: data[0].lon, // return the longitutude as an object
        lat: data[0].lat, // return the latitude as an object
      })
        .then((result) => {
          //cast the lon and lat values to numbers
          result.lon = Number(result.lon);
          result.lat = Number(result.lat);
          return result; // return the result
        })
        .catch((error) => {
          new Promise.reject(error);
        });
    });
}

//This function should take in a query string and return a Promise that fulfils with an object. The object should have a field lon and a field lat - corresponding to the longitude and latitude result of the query. If there are multiple results for a query, pick the first one. If there are no results for a location (the result array is empty), then the promise should reject with an error identical to the one below: new Error("No results found for query."); Use the following API to https://geocode.maps.co/search?q=query retrieve your results. The base URL should be "https://geocode.maps.co/search" and there should be one URL search parameter "q. This API returns an array of objects containing a lon and lat field.
