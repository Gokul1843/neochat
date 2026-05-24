const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://gokulbasu:g181843@ac-msi88lr-shard-00-00.i1fkttz.mongodb.net:27017,ac-msi88lr-shard-00-01.i1fkttz.mongodb.net:27017,ac-msi88lr-shard-00-02.i1fkttz.mongodb.net:27017/?ssl=true&replicaSet=atlas-hcfowl-shard-0&authSource=admin&appName=Cluster0"
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB Connected 🚀");
});

db.on("error", (err) => {
  console.log(err);
});