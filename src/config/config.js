module.exports = {
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME || "owlbook_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  },
  server: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "LB3IkfU5PP6D9C2b0kJgKIgQytjkWQ1m1ZMV9LzTpUyP8qjcvMURgqUFMmiqkd38",
  },
};
