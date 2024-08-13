// import the math module
// const math=require('./math');

// // use the add function from the math module
// let sum=math.add(6,4);
// console.log(sum);

// const http=require('http');
// const server=http.createServer( (req,res)=>{
// res.writeHead(200,{'Content-Type':'text/html'});
// res.write('Hello World');
// res.end();
// }
// );
// server.listen(3000,()=>{
//     console.log('Server is running');
//     });

// app.get('/',(req,res)=>{
//     res.send('Hello World');
// });

// const users =[
//     {id:1, name:"ram"},
//     {id:2, name:"shyam"},
//     {id:3,name:"Mohan"}
// ]

// app.get('/getUsers',(req,res)=>{
//     res.json(users);
// })

// app.get('/getUsers/:id',(req,res)=>{
//     const id=req.params.id;
//     const id_=parseInt(id);
//     const user=users.find(user=>user.id===id_);
//     if(user){
//         res.json(user);
//     }else{
//         res.status(404).send('User not found');
//     }
// }
// )

const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/Routes/authRoute");
const profileRoutes = require("./src/Routes/ProfileRoute");
const bookingRoute = require("./src/Routes/bookingRoute");
const courtRoute = require("./src/Routes/courtRoute");
const app = express();
const cors = require("cors");
const port = 5000;
connectDB();
app.use(express.json());
 

app.use(cors((
  origin = "http://localhost:3000")
  , (credentials = true)
));

app.use("/api/auth/", authRoutes);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api/profile", profileRoutes);
app.use("/api/category", bookingRoute);
app.use("/api/products", courtRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
