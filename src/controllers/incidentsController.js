const connectionDB = require('../database/index');

module.exports = {
  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id_incident] = await connectionDB('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.status(201).json({ id: id_incident });
  },

  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connectionDB('incidents').count();

    const incidents = await connectionDB('incidents')
      .join('ongs', 'incidents.ong_id', '=', 'ongs.id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.city',
        'ongs.uf',
        'ongs.whatsapp'
      ]);

    //return res.json(incidents);
    res.header('X-Total-Count', count['count(*)']);
    return res.json({ incidents });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id_header = req.headers.authorization;

    const ong_verify = await connectionDB('incidents')
      .where('id', id)
      .select('ong_id')
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

    await connectionDB('incidents')
      .where('id', id)
      .delete();

    return res.status(204).json({ result: 'ok' });
  }
};
