const express = require("express");
const { Connection } = require("./config/db");
const { userRouter } = require("./routes/userroutes");
const { bugRouter } = require("./routes/bugroutes");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/",userRouter)
app.use("/bug",bugRouter)

app.get("/home",(req,res)=>{
res.send("msg:welcome to home")
})

app.listen(process.env.port, async (req, res) => {
  try {
    await Connection;
    console.log("connected with db");
    console.log(`server is running at ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
