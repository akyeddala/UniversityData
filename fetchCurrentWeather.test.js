

import assert from "node:assert";
import { fetchCurrentWeather, makeWSearchURL } from "./fetchCurrentWeather.js";

test("fetchCurrentWeather follows type specification", () => {
  const promise = fetchCurrentWeather(42.36, -71.05);
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object"); // Assert the result is an object
    assert(Array.isArray(result.time)); // Assert the result has an array time field
    assert(result.time.every((x) => typeof x === "string")); // Assert each element in that time is a sting
    assert(Array.isArray(result.temperature_2m)); // Assert the result as an array temperature_2m field
    assert(result.temperature_2m.length > 0); //Assert
    assert(result.temperature_2m.every((x) => typeof x === "number")); // Assert each element in that time is a number
  });
});

test("fetchCurrentWeather rejects invalid coords", () => {
  const promise = fetchCurrentWeather(-1500, -71.05);
  assert(typeof promise === "object" && typeof promise.then === "function");

  return assert.rejects(promise.then());
});

test("fetchCurrentWeather rejects NaN input", () => {
  const promise = fetchCurrentWeather("chicken", "Sauce");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return assert.rejects(promise.then());
});
