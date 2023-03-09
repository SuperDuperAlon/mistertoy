import { storageService } from "./storage.service.js";
import { asyncStorageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import {httpService} from "./http.service.js"

// const axios = require('axios');

const STORAGE_KEY = "toyDB";
const BASE_URL = "/toys/";

// _createtoys();

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getLabels
};

async function query(filterBy) {
  const queryParams = 
  `?name=${filterBy.name}&inStock=${filterBy.inStock}&label=${filterBy.labels}&price=${filterBy.maxPrice}`
  return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

async function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

async function save(toy) {
  if (toy._id) {
      return httpService.put(BASE_URL, toy)
  } else {
      return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return {
    name: "",
    labels: "",
    price: "",
  };
}

function getLabels() {
  return labels
}

function getDefaultFilter() {
  return { name: "", inStock: "", outStock: "", labels: [], maxPrice: '' };
}

const labels = [
  "On wheels",
  "Box game",
  "Art",
  "Baby",
  "Doll",
  "Puzzle",
  "Outdoor",
  "Battery Powered",
];
