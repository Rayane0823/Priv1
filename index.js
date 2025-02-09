const FILE_PATH = "./data.json";
const simpleGit = require("simple-git");
const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");

// Change the working directory to where your local repository is located
const git = simpleGit("/Users/rayane/Desktop/priv/Priv1");

const makeCommit = (n) => {
  if (n === 0) {
    // Push changes to the remote repository
    git.push(["-u", "origin", "master"], (err, result) => {
      if (err) {
        console.error("Error pushing to remote:", err);
      } else {
        console.log("Pushed changes to remote repository");
        console.log("Result:", result); // Ajoutez ce log pour inspecter `result`
      }
    });
    return;
  }


  const DATE = moment()
  .year(2025) 
  .month(random.int(0, 4)) // Génère un mois aléatoire
  .date(random.int(1, 28)) // Génère un jour aléatoire (limité à 28 pour éviter les problèmes avec février)
  .hour(random.int(0, 23)) // Génère une heure aléatoire
  .minute(random.int(0, 59)) // Génère une minute aléatoire
  .second(random.int(0, 59)) // Génère une seconde aléatoire
  .format();

  const data = {
    date: DATE,
  };
  console.log(DATE);
  
  jsonfile.writeFile(FILE_PATH, data, () => {
    git
    .add(["index.js", "package-lock.json", FILE_PATH])
    .commit(`Commit du ${DATE}`, { "--date": DATE })
    .push(["-u", "origin", "master"], (err, result) => {
      if (err) {
        console.error("Error pushing to remote:", err);
      } else {
        console.log("Pushed changes to remote repository", result);
        makeCommit(--n);
      }
    });
  });
}

makeCommit(120);
