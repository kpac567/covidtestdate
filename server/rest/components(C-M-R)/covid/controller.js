const Covid = require('./model');

const Covids = new Covid();

async function getCovids(request, response) {
  try {
    const call = await Covids.getAll();
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

async function getCovidById(request, response) {
  const id = parseInt(request.params.id, 10);
  try {
    const call = await Covids.getBy('id', id);
    response.status(200).json(call);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

module.exports.getCovids = getCovids;
module.exports.getCovidById = getCovidById;
