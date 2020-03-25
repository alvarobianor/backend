const crypto = require('crypto');
const connectionDB = require('../database/index');

module.exports = {
  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connectionDB('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.status(200).json({ id });
  },

  async index(req, res) {
    const ongs = await connectionDB('ongs').select('*');

    //return res.json(ongs)

    return res.json(
      ongs.map(ongs => {
        const { id, name } = ongs;
        return { id, name };
      })
    );
  }
};
