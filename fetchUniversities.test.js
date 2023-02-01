import assert from "node:assert";
import { fetchUniversities } from "./fetchUniversities.js";

// node --experimental-vm-modules node_modules/jest/bin/jest.js ./src/fetchUniversities.test.js

// Added upon by Benjamin Wong

test("fetchUniversities follows type specification", () => {
  const promise = fetchUniversities("University of Massachusetts Amherst");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result)); // Assert the result in an array
    assert(result.every((x) => typeof x === "string")); // Assert each element in the array is a string
  });
});

// test to make sure fetchUniversities returns all items containing the query.
// i.e: all UMass's
test("fetchUniversities returns all UMasses", () => {
  const promise = fetchUniversities("University of Massachusetts");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result)); // Assert the result in an array
    assert(result.every((x) => typeof x === "string")); // Assert each element in the array is a string
    assert(result.length === 4); // There are 4 Umasses
    assert(result[0] === "University of Massachusetts Boston"); // Slightly arbitrary, but make sure our results are in order from API
    assert(result[1] === "University of Massachusetts Amherst");
    assert(result[2] === "University of Massachusetts Dartmouth");
    assert(result[3] === "University of Massachusetts Lowell");
  });
});

// test to observe fetchUniversities behavior with an empty query
// i.e test if fetchUniversities rejects properly.
test("Empty Query", () => {
  const promise = fetchUniversities("");
  assert(typeof promise === "object");
  assert.rejects(promise);
});

// test that query fetches with no results still returns a promise with an empty array.
test("No resultant query", () => {
  const promise = fetchUniversities("Should be Empty!");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result)); // Assert the result is in an array
    assert(result.length === 0);
  });
});

// The API automatically rejects when passed a query with < 5 characters.
test("short query", () => {
  const promise = fetchUniversities("zdwq");
  assert(typeof promise === "object");
  assert.rejects(promise);
});
