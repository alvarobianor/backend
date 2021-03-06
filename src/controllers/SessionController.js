const connectionDB = require('../database/index');

module.exports = {
  async store(req, res) {
    const { id } = req.body;

    const ong = await connectionDB('ongs')
      .where('id', id)
      .select('name')
      .first();

    if (!ong) {
      return res.status(400).json({ error: 'Not found ONG with this ID' });
    }

    return res.status(201).json(ong);
  }
};
