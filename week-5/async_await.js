const fs = require("fs");
const path = require("path");

function fsReadFilePromisified(filepath, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function main() {

  const file1Path = path.join(__dirname, "a.txt");
  const file2Path = path.join(__dirname, "b.txt");
  const file3Path = path.join(__dirname, "c.txt");

  let file1content = await fsReadFilePromisified(file1Path, "utf-8");
  let file2content = await fsReadFilePromisified(file2Path, "utf-8");
  let file3content = await fsReadFilePromisified(file3Path, "utf-8");

  console.log(file1content);
  console.log(file2content);
  console.log(file3content);
}

main(); 

console.log("Hi");
console.log("Hello");
