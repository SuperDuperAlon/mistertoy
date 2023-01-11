// import { storageService } from "./storage.service.js";
// import { asyncStorageService } from "./async-storage.service.js";
// import { utilService } from "./util.service.js";
// import {httpService} from "./http.service.js"

// // const axios = require('axios');

// const STORAGE_KEY = "toyDB";
// const BASE_URL = "/toys";

// // _createtoys();

// export const toyService = {
//   query,
//   getById,
//   save,
//   remove,
//   getEmptyToy,
//   getDefaultFilter,
//   getLabels
// };

// function query(filterBy = getDefaultFilter()) {
//   const queryParams = 
//   `?name=${filterBy.name}&inStock=${filterBy.inStock}&label=${filterBy.labels}`
//   return httpService.get(BASE_URL + queryParams)
// }

// function getById(toyId) {
//   return httpService.get(BASE_URL + toyId)
// }

// function remove(toyId) {
//   return httpService.delete(BASE_URL + toyId)
// }

// function save(toy) {
//   if (toy._id) {
//       return httpService.put(BASE_URL, toy)
//   } else {
//       return httpService.post(BASE_URL, toy)
//   }
// }

// function getEmptyToy() {
//   return {
//     name: "",
//     labels: "",
//     price: "",
//   };
// }

// function getLabels() {
//   return labels
// }

// function getDefaultFilter() {
//   return { txt: "", inStock: "", outStock: "", labels: [] };
// }

// // function _createtoys() {
// //   var toys = storageService.loadFromStorage(STORAGE_KEY);
// //   if (!toys || !toys.length) {
// //     toys = [
// //       {
// //         _id: utilService.makeId(),
// //         name: "Pikachu",
// //         price: utilService.getRandomIntInclusive(99, 150),
// //         labels: ["Outdoor", "Battery Powered", "Baby"],
// //         createdAt: new Date(),
// //         inStock: false,
// //       },
// //       {
// //         _id: utilService.makeId(),
// //         name: "Charmander",
// //         price: utilService.getRandomIntInclusive(99, 150),
// //         labels: ["Puzzle", "Battery Powered", "Outdoor"],
// //         createdAt: new Date(),
// //         inStock: true,
// //       },
// //       {
// //         _id: utilService.makeId(),
// //         name: "Squirtel",
// //         price: utilService.getRandomIntInclusive(99, 150),
// //         labels: ["Doll", "Battery Powered", "Art"],
// //         createdAt: new Date(),
// //         inStock: false,
// //       },
// //       {
// //         _id: utilService.makeId(),
// //         name: "Snaorlax",
// //         price: utilService.getRandomIntInclusive(99, 150),
// //         labels: ["Doll", "Battery Powered", "Baby"],
// //         createdAt: new Date(),
// //         inStock: false,
// //       },
// //       {
// //         _id: utilService.makeId(),
// //         name: "Psyduck",
// //         price: utilService.getRandomIntInclusive(99, 150),
// //         labels: ["Art", "Battery Powered", "Puzzle"],
// //         createdAt: new Date(),
// //         inStock: true,
// //       },
// //     ];
// //     storageService.saveToStorage(STORAGE_KEY, toys);
// //   }
// // }

// const labels = [
//   "On wheels",
//   "Box game",
//   "Art",
//   "Baby",
//   "Doll",
//   "Puzzle",
//   "Outdoor",
//   "Battery Powered",
// ];


import { storageService } from "./storage.service.js";
import { asyncStorageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
// import {httpService} from "./http.service.js"

// const axios = require('axios');

const STORAGE_KEY = "toyDB";
const BASE_URL = "/toys";

_createtoys();

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getLabels
};

function query(filterBy = getDefaultFilter()) {
  console.log(filterBy);
  return asyncStorageService.query(STORAGE_KEY).then((toys) => {
    let filteredToys = toys;
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, "i");
      filteredToys = filteredToys.filter((toys) => regex.test(toys.name));
    }
    if (filterBy.outStock) {
      filteredToys = filteredToys.filter((toy) => !toy.inStock);
    }
    if (filterBy.inStock) {
      filteredToys = filteredToys.filter((toy) => toy.inStock);
    }
    // if (filterBy.active) {
    //     filteredToys = filteredToys.filter(todo => !todo.isDone)
    // }
    // if (filterBy.done) {
    //     filteredToys = filteredToys.filter(todo => todo.isDone)
    // }
    // if (sortBy.txt > 0) {
    //     filteredToys = filteredToys.sort((a, b) => a.txt.localeCompare(b.txt))
    // }
    // if (sortBy.txt < 0) {
    //     filteredToys = filteredToys.sort((a, b) => a.txt.localeCompare(b.txt))
    // }
    // Paging
    // const totalPages = Math.ceil(todos.length / pageSize)
    return Promise.resolve(filteredToys);
  });
}

function getById(toyId) {
  return asyncStorageService.get(STORAGE_KEY, toyId);
}
function remove(toyId) {
  // return Promise.reject('Not now!')
  return asyncStorageService.remove(STORAGE_KEY, toyId);
}
function save(toy) {
  if (toy._id) {
    return asyncStorageService.put(STORAGE_KEY, toy);
  } else {
    const newToy = { ...toy };
    newToy.createdAt = new Date();
    newToy.inStock = true;

    return asyncStorageService.post(STORAGE_KEY, newToy);
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
  return { txt: "", inStock: "", outStock: "", labels: [] };
}

function _createtoys() {
  var toys = storageService.loadFromStorage(STORAGE_KEY);
  if (!toys || !toys.length) {
    toys = [
      {
        _id: utilService.makeId(),
        name: "Pikachu",
        price: utilService.getRandomIntInclusive(99, 150),
        labels: ["Outdoor", "Battery Powered", "Baby"],
        createdAt: new Date(),
        inStock: false,
      },
      {
        _id: utilService.makeId(),
        name: "Charmander",
        price: utilService.getRandomIntInclusive(99, 150),
        labels: ["Puzzle", "Battery Powered", "Outdoor"],
        createdAt: new Date(),
        inStock: true,
      },
      {
        _id: utilService.makeId(),
        name: "Squirtel",
        price: utilService.getRandomIntInclusive(99, 150),
        labels: ["Doll", "Battery Powered", "Art"],
        createdAt: new Date(),
        inStock: false,
      },
      {
        _id: utilService.makeId(),
        name: "Snaorlax",
        price: utilService.getRandomIntInclusive(99, 150),
        labels: ["Doll", "Battery Powered", "Baby"],
        createdAt: new Date(),
        inStock: false,
      },
      {
        _id: utilService.makeId(),
        name: "Psyduck",
        price: utilService.getRandomIntInclusive(99, 150),
        labels: ["Art", "Battery Powered", "Puzzle"],
        createdAt: new Date(),
        inStock: true,
      },
    ];
    storageService.saveToStorage(STORAGE_KEY, toys);
  }
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
