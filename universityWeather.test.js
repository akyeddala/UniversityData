import assert from "node:assert";
import {
  fetchUCalWeather,
  fetchUMassWeather,
  fetchUniversityWeather,
} from "./universityWeather.js";

// node --experimental-vm-modules node_modules/jest/bin/jest.js ./src/universityWeather.test.js
test("fetchUCalWeather follows type specification", () => {
  const promise = fetchUCalWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    assert(Object.keys(result).every((x) => typeof x === "string"));
    assert(Object.values(result).every((x) => typeof x === "number"));
  });
});

test("fetchUMassWeather follows type specification", () => {
  const promise = fetchUMassWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    assert(Object.keys(result).every((x) => typeof x === "string"));
    assert(Object.values(result).every((x) => typeof x === "number"));
  });
});

//test if universityWeather rejects properly.
test("fetchUniversityWeather rejects when no matches are found.", () => {
  const promise = fetchUniversityWeather("Foobar");
  assert.rejects(promise);
});

//continued test if universityWeather rejects properly.
test("Rejects with empty query", () => {
  const promise = fetchUniversityWeather("");
  assert(typeof promise === "object");
  assert.rejects(promise);
});

//continued test if universityWeather rejects properly.
test("Rejects with query that has no results", () => {
  const promise = fetchUniversityWeather("Random seach here");
  assert(typeof promise === "object");
  assert.rejects(promise);
});
