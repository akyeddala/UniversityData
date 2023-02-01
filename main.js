// With the functions you have written above, write a small program (inside of main.js) that computes an interesting statistic about the weather or universities. The requirements of the program are:

// It must use at least three different functions written in steps 1-8
// The result of the program must be output somehow (either in the console or into a file)
// If you choose a file I/O function, it counts towards the above requirement
// The program must be documented with what it calculates exactly
// The program must produce a correct result according to its documentation

import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";
import { readFromJSONFile, writeToJSONFile } from "./fileUtility.js";
import { fetchUniversityWeather } from "./universityWeather.js";

//finds the furthest distance between universities in a query in kilometers using the Haversine formula:
// d = 2r*arcsin( sqrt( sin^2( (lat2-lat1)/2 ) + cos(lat1)*cos(lat2)*sin^2( (lon2-lon1)/2 ) ) )
// and writes it to a json file
async function furthestDistanceInKm(query) {
  let universities = await fetchUniversities(query);
  let coordinates = await Promise.all(
    universities.map((university) => {
      return fetchLongitudeAndLatitude(university);
    })
  );
  let distances = [];

  //helper function to find distance in kilometers
  function haversine(lo1, la1, lo2, la2) {
    let rad = Math.pi / 180; //conversion from degrees to radians
    let r = 6371; //radius of the earth
    let a =
      Math.pow(Math.sin((la2 * rad - la1 * rad) / 2), 2) +
      Math.cos(la1 * rad) *
        Math.cos(la2 * rad) *
        Math.pow(Math.cos((lo2 * rad - lo1 * rad) / 2), 2); //radicand
    return 2 * r * Math.asin(Math.sqrt(a));
  }

  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      let distance = haversine(
        coordinates[i].lon,
        coordinates[j].lon,
        coordinates[i].lat,
        coordinates[j].lat
      );
      distances.push(distance);
    }
  }
  let furthestDistance = Math.max(...distances);
  let result = { furthestDistance: furthestDistance };
  writeToJSONFile(result, "furthestDistance.json").then(() =>
    console
      .log("Files successfully written.")
      .catch(() => console.log("Files could not be written."))
  );
}

//Benjamin got the idea of working on the distance between universities whereas Akshit provided the outline for the code and wrote the helper function for the Haversine formula and Talish helped in writing the file to a json file and pushing the correct values into the array. All of us worked on debugging/testing the main.js together.
