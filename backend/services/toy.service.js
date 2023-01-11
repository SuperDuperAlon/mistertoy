const fs = require('fs')
var toys = require('../data/toys.json')
console.log(toys);

module.exports = {
    query, 
    get,
    remove,
    save
}

function query(filterBy) {
    // console.log(filterBy);
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
    
  }

  function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _writeToysToFile()
}


function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such Toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = +toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.createdAt = toy.createdAt
        toyToUpdate.inStock = toy.inStock
    } else {
        toy._id = _makeId()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toys .json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}