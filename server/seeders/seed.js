const db = require("../config/connection");
const { User, Monster } = require("../models");
const userSeeds = require("./userSeeds.json");
const monsterSeeds = require("./monsterSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Monster", "monsters");

    await cleanDB("User", "users");

    await User.create(userSeeds);

    await Monster.create(monsterSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
