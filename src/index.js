//Making library that talks with express api
//NEED TO TELL PACKAGE.JSON THAT main: "is in src/index.js"

const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const credentials = require("../credentials.json");

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();

const app = express();
app.use(express.json()); //tells api to expect an incoming .json file when we post on postman

//Now add in to get all users currently in our firestore database and see it in web.  Getting info
//from user input (in this case we use Postman as mock front end).  getting the info and sending it
//it back.

//getting all users from collection.  resolve promise by giving snapshot of the collection.

app.get("/", (request, response) => {
  const userCollection = db.collection("users");

  userCollection.get().then((snapshot) => {
    // const users = []
    // snapshot.forEach(doc => {
    //     users.push({id: doc.id, ...doc.data()})
    // })

    response.send(snapshot.docs);
  });

  // response.send('Hello World!');
});

//Below shows using get on further endpoint of web Browser
// app.get("/users", (request, response) => {
//   response.send("Here is your user list"); //response sent back to user.
// });

//now use post app
//whatever you send(true for push and patch too) as the body
//"/" the route from local computer

//in post, we are getting something from user..ie. username and password.  then we need to check if
//its verified and allow them access
app.post("/users", (req, res) => {
  const { name, age, email } = req.body; //body is always what is being sent to server in a post

  const user = { name, age, email }; //saying value of key is same as name

  const result = `My name is ${user.name}, I am ${user.age} years old and my email is ${user.email}`;

  res.send(result); //sending information back to user
});

app.listen(3000, () => {
  console.log("We listening on 3000");
});
