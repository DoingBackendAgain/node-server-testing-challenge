
exports.up = async function(knex) {
  await knex.schema.createTable("fruits", (table)=> {
      table.increments("id")
      table.text("name").unique()
      table.integer("yummy")
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("fruits")
};
