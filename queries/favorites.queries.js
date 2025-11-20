const queries = {
  getFavoriteById: `
    SELECT id_movie FROM favorites
    WHERE id_user = $1
`,

  createFavorite: `
    INSERT INTO favorites (id_user, id_movie)
    VALUES ($1, $2)
    RETURNING *;
    `,

  deleteFavorite: `
    DELETE FROM favorites
    WHERE id_user = $1 AND id_movie = $2
    RETURNING *;
  `,
};

module.exports = queries;
