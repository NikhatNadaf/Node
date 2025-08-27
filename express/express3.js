const express = require('express');
const app= express();

app.get('/user/:id',(req,res)=>{
  res.send('User Id is '+req.params.id);
})

app.get('/search',(req,res)=>{
  res.json(req.query);
})

app.use(express.json()); // To handle JSON body
app.post("/users", (req, res) => {
  res.json(req.body);
});

app.listen(3000,()=>{
  console.log('Server is running on port 3000');
})