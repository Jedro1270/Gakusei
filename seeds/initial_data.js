
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

      INSERT INTO "badges"(badge_type, badge_icon, badge_name, badge_description, points_value)
        VALUES
          ('MILESTONE', 'pomo-peasant-badge.png', 'Pomo Peasant', 'Successfuly Finish 2 Pomodoro Timers', 100),
          ('MILESTONE', 'pomo-samurai-badge.jpg', 'Pomo Samurai', 'Successfuly Finish 8 Pomodoro Timers', 200),
          ('MILESTONE', 'pomo-daimyo-badge.gif', 'Pomo Daimyo', 'Successfuly Finish 16 Pomodoro Timers', 400),
          ('MILESTONE', 'pomo-daimyo-badge.png', 'Pomo Shogun', 'Successfuly Finish 32 Pomodoro Timers', 800),
          ('MILESTONE', 'scholar-badge.png', 'Scholar', 'Create your First Note', 50),
          ('MILESTONE', 'philosopher-badge.png', 'Philosopher', 'Create 5 Notes', 200),
          ('MILESTONE', 'sage-badge.png', 'Sage', 'Create 15 Notes', 500),
          ('SPECIAL', 'sensei-badge.gif', 'Sensei', 'Create a Group', 200),
          ('SPECIAL', 'soke-badge.png', 'Soke', 'Become the Highest Ranking Member of your Group', 400);
    `
  );
};
