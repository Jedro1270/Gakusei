
exports.seed = function(knex) {
  return knex.raw(
    `
      INSERT INTO "levels"(minimum_points, maximum_points)
        VALUES
          (0, 99),
          (100, 299),
          (300, 599),
          (600, 999),
          (1000, 1499),
          (1500, 2099),
          (2100, 2799),
          (2800, 3599),
          (3600, 4499),
          (4500, 5499);
    `
  );
};
