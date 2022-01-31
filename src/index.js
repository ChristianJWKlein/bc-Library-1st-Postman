//Making library that talks with express api
//NEED TO TELL PACKAGE.JSON THAT main: "is in src/index.js"

const express = require("express");

const app = express();
app.use(express.json()); //tells api to expect an incoming .json file when we post on postman

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/users", (request, response) => {
  response.send("Here is your user list");
});

//now use post app
//whatever you send(true for push and patch too) as the body
//"/" the route from local computer

app.post("/users", (req, res) => {
  const { name, age, email } = req.body; //body is always what is being sent to server in a post

  const user = { name, age, email }; //saying value of key is same as name

  const result = `My name is ${user.name}, I am ${user.age} years old and my email is ${user.email}`;

  res.send(result); //sending information back to user
});

app.listen(3000, () => {
  console.log("We listening on 3000");
});
