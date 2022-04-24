
const local =  {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "password": "postgres",
   "database": "beach-tennis",
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

const producao =  {
   "type": "postgres",
   "url": `${process.env.DATABASE_URL}`,
   "synchronize": false,
   "logging": false,
   "extra": {
      "ssl": {
         "rejectUnauthorized": false,
       }
   },
   "entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "src/migration/**/*.js"
   ],
   "subscribers": [
      "dist/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

module.exports = process.env.NODE_ENV === 'dev'? local:producao