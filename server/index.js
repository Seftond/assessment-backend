const express = require("express");
const cors = require("cors");

const app = express(); 


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.
let numbers = [{
  "message": "message1"
},
{
  "message": "message2"
},
{
  "message": "message3"
}];

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
    "A dubious friend may be an enemy in camouflage.",
    "A faithful friend is a strong defense.",
    "A feather in the hand is better than a bird in the air."];

  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);

});

app.get("/api/messages", (req, res) => {
  res.status(200).send(numbers);
});

app.post("/api/messages", (req, res) => {
  let { message } = req.body;
  let newMessage = {
    message,
  };
  numbers.push(newMessage);
  res.status(200).send(numbers);
});

app.put("/api/messages/:message", (req, res) => {
  let currentMessage = req.params.message;
  let newMessage = req.body.message;
  for(let i = 0; i < numbers.length; i++){
    if(numbers[i].message === currentMessage){
      numbers[i].message = newMessage;
      res.status(200).send(numbers);
      return;
    }
  }
  res.status(400).send('Cannot find message that matches');
});

app.delete("/api/messages/:message", (req, res) => {
  let currentMessage = req.params.message;
  for(let i = 0; i < numbers.length; i++){
    if(numbers[i].message === currentMessage){
      numbers.splice(i, 1);
      res.status(200).send(numbers);
      return;
    }
  }
  res.status(400).send('Cannot find message that matches');
})




app.listen(4000, () => console.log("Server running on 4000"));
