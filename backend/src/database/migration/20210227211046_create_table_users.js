// CRIAR TABELAS NO BANCO

exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("nome").unique().notNullAble();
    table.string("cpf");
    table.string("email");
    table.string("telefone");
    table.string("estadoCivil");
    table.string("cep");
    table.string("estado");
    table.string("municipio");
    table.string("bairro");
    table.string("rua");
    table.string("numero");
    table.text("complemento");

    table.timestamp("create_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
