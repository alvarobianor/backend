const connectionDB = require('../database/index');

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const ong_id_header = req.headers.authorization;

    const ong_verify = await connectionDB('incidents')
      .where('id', id)
      .select('*')
      .first();

    // se nn usar o .first()
    // if (ong_verify[0].ong_id != ong_id_header) {
    //   return res.status(401).json('Unhauthorized operation');
    // }

    if (ong_verify === undefined) {
      return res.status(400).json({ error: 'bad request' });
    }
    if (ong_verify.ong_id != ong_id_header) {
      return res.status(401).json('Unhauthorized operation');
    }

    const incident = await connectionDB('incidents')
      .where('id', id)
      .first();

    console.log(incident);

    res.status(200).json({ incident });
  }
};
