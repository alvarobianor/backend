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
    const incidents = await connectionDB('incidents').select('*');

    //return res.json(incidents);

    return res.json(
      incidents.map(incidents => {
        const { id, ong_id, title } = incidents;
        return { id, ong_id, title };
      })
    );
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

    if (ong_verify === undefined){
      return res.status(400).json({error:'bad request'})
    }
    if (ong_verify.ong_id != ong_id_header) {
      return res.status(401).json('Unhauthorized operation');
    }

    await connectionDB('incidents')
      .where('id', id)
      .delete();

    return res.status(204).json({ 'result': 'ok' });
  }
};
