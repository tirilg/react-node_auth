exports.seed = function(knex) {
  return knex('goals')
    .del()
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('users').insert([
        {
          username: 'alexmoore',
          email: 'alex@moore.com',
          password: '$2b$10$LewTPk8vd0N8VKOyKMQfae6/arsUOubvgfrfYlqIYaqB6nGJrOGhG' // -> password is 'password'
        },
        {
          username: 'mikescott',
          email: 'mikescott@dundermifflin.com',
          password: '$2b$10$LewTPk8vd0N8VKOyKMQfae6/arsUOubvgfrfYlqIYaqB6nGJrOGhG' // -> password is 'password'
        },
        {
          username: 'pam',
          email: 'pam@test.com',
          password: '$2b$10$LewTPk8vd0N8VKOyKMQfae6/arsUOubvgfrfYlqIYaqB6nGJrOGhG' // -> password is 'password'
        }
      ]);
    })
    .then(() => {
      return knex('goals').insert([
        {
          user_id: 1,
          goal: 'Buy dream car',
          description: 'Get the Audi I always dreamt of'
        },
        {
          user_id: 2, 
          goal: 'Travel to Tokyo',
          completed: true
        },
        {
          user_id: 3,
          goal: 'Finish studies',
          description: 'Finish studies so I can get my dream job',
          completed: true
        },
        {
          user_id: 3,
          goal: 'Travel to Hawaii'
        }
      ])
    })
};
