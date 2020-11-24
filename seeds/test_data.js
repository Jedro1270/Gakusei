
exports.seed = function(knex) {
  return knex.raw(
    `
      INSERT INTO "users"(profile_picture, username, password, points)
        VALUES
        (),
    `
  );
};
