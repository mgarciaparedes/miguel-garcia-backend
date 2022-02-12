const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const { dbConnection } = require("./database/config");

const app = express();

/*Base de datos*/
// dbConnection();

//Uso de CORS
app.use(cors());

//Directorio público, usando use() Middleware
app.use(express.static("public"));

//Lectira y parseo del body
app.use(express.json({ limit: '200mb' }));

//Rutas
app.use("/api/email", require("./routes/testEmail")); 

app.listen(process.env.PORT, () => {
  console.log(`Server is runing, port: ${process.env.PORT}`);
});
