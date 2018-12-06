
module.exports = {
    up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
        return queryInterface.sequelize.query('ALTER TABLE "refreshToken" ADD COLUMN IF NOT EXISTS "userId" INTEGER; ALTER TABLE "refreshToken" DROP COLUMN IF EXISTS "uuid";');
    },
    down() {
        return true;
    },
};
