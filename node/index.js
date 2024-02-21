const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Guilherme')`;
connection.query(sql);

app.get("/", async (req, res) => {
  const query = `SELECT * FROM people`;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
      return;
    }
    let htmlContent = "<h1>Full Cycle Rocks!</h1> <ul>";
    results.forEach((row) => {
      htmlContent += `<li>${row["name"]}</li>`;
    });
    htmlContent += "</ul>";
    res.send(htmlContent);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});

process.on("exit", () => {
  if (connection) connection.end();
});
