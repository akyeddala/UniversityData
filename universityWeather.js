import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

//helper function to get average of temperatures
export function tempAve(tArray) {
  let n = tArray.length;
  let sum = tArray.reduce((acc, e) => acc + e, 0);
  return sum / n;
}

//fetchUniversityWeather(universityQuery: string): Promise<{ [key: string]: number }>
export function fetchUniversityWeather(query) {
  // array of objects with signature {key: string, temps: number[]}
  let keys = [];
  //array to hold average temperatures
  let tempAves = [];
  //number with total average temperature
  let totalAve = 0;
  //obj to be filled with final contents
  let obj = {};

  return fetchUniversities(query) //fetch a Promise that resolves to an array of university names that start with the query
    .then(function (keysArray) {
      if (keysArray.length === 0) {
        //returns a promise that rejects with an error (below) when there are no results
        return Promise.reject(new Error("No results found for query."));
      } else {
        keys = keysArray.map((e) => e);
        return Promise.all(keysArray.map((e) => fetchLongitudeAndLatitude(e))) //map array to promises that resolve to objects with lon and lat, turn array into one promise that resolves to an array
          .then(function (coordsArray) {
            if (coordsArray.length <= 0) {
              return Promise.reject(new Error("No results found for query.")); //return a promise that rejects with an error if there are no results
            } else {
              return Promise.all(
                coordsArray.map((e) => fetchCurrentWeather(e.lon, e.lat))
              ) //map array to promises that resolve to objects with time and temperature_2m, turn array into one promise that resolves to an array of said objects
                .then(function (weatherArray) {
                  if (weatherArray.length <= 0) {
                    return Promise.reject(
                      new Error("No results found for query.")
                    ); //return a promise that rejects with an error if there are no results
                  } else {
                    tempAves = weatherArray.map((e) =>
                      tempAve(e.temperature_2m)
                    ); //map array to average of all temperatures in each object
                    totalAve = tempAve(tempAves);
                    obj = { totalAverage: totalAve };
                    for (let i = 0; i < keys.length; i++) {
                      obj[keys[i]] = tempAves[i];
                    }
                    return Promise.resolve(obj);
                  }
                });
            }
          });
      }
    })
    .catch((err) => new Promise.reject(err)); //return a promise that rejects with an error if there is an error thrown
}

//Talish provided the basic outline for the code and worked until mapping the keys whereas Akshit worked on making a helper function for average temperatures and pushing the average values to the array and object and Benjamin worked on debugging/testing the code and catching the necessary errors.
export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California");
}
