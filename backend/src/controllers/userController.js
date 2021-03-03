const { json, response } = require("express");
const knex = require("../database");
module.exports = {
  async index(req, res) {
    const users = await knex("users");

    return res.json(users);
  },

  async create(req, res, next) {
    try {
      const {
        nome,
        cpf,
        email,
        telefone,
        estadoCivil,
        cep,
        estado,
        municipio,
        bairro,
        rua,
        numero,
        complemento,
      } = req.body;

      await knex("users").insert({
        nome,
        cpf,
        email,
        telefone,
        estadoCivil,
        cep,
        estado,
        municipio,
        bairro,
        rua,
        numero,
        complemento,
      });

      return res.json(nome);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { nome } = req.body;
      const { id } = req.params;

      await knex("users").update({ nome }).where({ id });

      return res.send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("users").where({ id }).del();

      return res.send();
    } catch (error) {
      next(error);
    }
  },
};
