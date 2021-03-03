// INSERÇÃO DE DADOS

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          nome: "gabriel",
          cpf: "10226604977",
          email: "gabrielluizturatti@gmail.com",
          telefone: "49999350235",
          estadoCivil: "solteiro",
          cep: "89715899",
          estado: "santa catarina",
          municipio: "concordia",
          bairro: "interior",
          rua: "frei justino",
          numero: "90",
          complemento: "sem complemento",
        },
      ]);
    });
};
