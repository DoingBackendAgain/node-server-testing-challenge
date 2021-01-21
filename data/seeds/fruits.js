
exports.seed = async function(knex) {
  await knex("fruits").insert([
    {name: "banana", yummy: 4},
    {name: "strawberry", yummy: 9},
    {name: "blueberry", yummy: 7},
    {name: "blackberry", yummy: 8}
  ])
};
