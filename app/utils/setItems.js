import { Storage } from "./storage";
import { KEY } from "../constants/storageKeys";

export const saveItem = async (item) => {
  const key = Object.keys(item)[0]
  const val = Object.values(item)[0]
  try {
    await Storage.setItem(KEY[key], val);
  } catch (error) {
    console.error(`Failed to save ${key}`, error);
  }
};