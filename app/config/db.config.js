module.exports = {
  HOST: "ep-empty-dew-ad6g88yq-pooler.c-2.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_JPBsEY7KlXy5",
  DB: "neondb",
  dialect: "postgres",

  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};