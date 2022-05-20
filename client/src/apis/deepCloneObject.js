import { cloneElement } from "react";

export default function deepCloneObject(obj) {
  const newObj = {};

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      newObj[key] = deepCloneObject(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}
