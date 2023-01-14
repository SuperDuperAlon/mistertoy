const toyService = require('./toy.service');

const logger = require('../../services/logger.service')

async function getToys(req, res) {
  try {
    // console.log(toys);
    logger.debug("Getting Cars");
    const filterBy = {
      name: req.query.name || ''
    }
    console.log(filterBy, 'cont');
    const toys = await toyService.query(filterBy);
    // console.log(toys);
    res.json(toys);
  } catch (err) {
    logger.error("Failed to get toys", err);
    res.status(500).send({ err: "Failed to get toys" });
  }
}

async function getToyById(req, res) {
  try {
    const toyId = req.params.id
    console.log(toyId);
    const toy = await toyService.getById(toyId);
    res.json(toy);
  } catch (err) {
    logger.error("Failed to get toy", err);
    res.status(500).send({ err: "Failed to get toy" });
  }
}

async function updateToy(req, res) {
  try {
    const toy = req.body;
    const updatedToy = await toyService.add(toy);
    res.json(updatedToy);
  } catch (err) {
    logger.error("Failed to update toy", err);
    res.status(500).send({ err: "Failed to update toy" });
  }
}

async function addToy(req, res) {
  const { loggedinUser } = req;
  // console.log(req);
  try {
    const toy = req.body
    toy.owner = loggedinUser;
    console.log(toy, 'lala');
    const addedToy = await toyService.add(toy);
    res.json(addedToy);
  } catch (err) {
    logger.error("Failed to add toy", err);
    res.status(500).send({ err: "Failed to add toy" });
  }
}

  async function removeToy(req, res) {
    try {
        const toyId = req.params.id
        const removedId = await toyService.remove(toyId)
        res.send(removedId)
      } catch (err) {
        logger.error('Failed to remove toy', err)
        res.status(500).send({ err: 'Failed to remove toy' })
  }
}




// async function addToyMsg(req, res) {
//   try {
//   } catch (err) {}
// }

// async function removeToyMsg(req, res) {
//   try {
//   } catch (err) {}
// }

module.exports = {
  getToys,
  getToyById,
  addToy,
  updateToy,
  removeToy,
//   addToyMsg,
//   removeToyMsg,
};
