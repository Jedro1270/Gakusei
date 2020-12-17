
exports.seed = function(knex) {
  return knex.raw(
    `
      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(0, 99);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(100, 299);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(300, 599);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(600, 999);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(1000, 1499);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(1500, 2099);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(2100, 2799);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(2800, 3599);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(3600, 4499);

      INSERT INTO "levels"(minimum_points, maximum_points)
      VALUES(4500, 5499);
    `
  );
};
