const Barbecue = require('../database/models/Barbecue');

async function list(req, res) {
  const { _id } = req.user;
  const barbecues = await Barbecue.find({
    ownerId: _id,
    // date: { $gte: new Date() },
  }).lean();
  res.status(200).send(barbecues);
}

async function getById(req, res) {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;

    const barbecue = await Barbecue.findOne({
      ownerId: userId,
      _id: id,
    }).lean();
    res.status(200).send(barbecue);
  } catch (e) {
    res.sendStatus(500);
  }
}

async function create(req, res) {
  const { description, participants, date } = req.body;
  const { _id } = req.user;

  const parsedDate = new Date(date + 'T10:00:00');

  await Barbecue.create({
    description,
    date: parsedDate,
    participants,
    ownerId: _id,
  });

  res.sendStatus(200);
}

async function update(req, res) {
  try {
    const { _id, participants } = req.body;

    await Barbecue.findByIdAndUpdate({ _id }, { participants });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = {
  list,
  create,
  update,
  getById,
};
