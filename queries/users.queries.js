const queries = {
  getUserByEmail: `
    SELECT * FROM users
    WHERE email = $1
`,

  createUser: `
    INSERT INTO users (username, email, role, password)
    VALUES ($1, $2, $3, $4)
    `,
};

module.exports = queries;
