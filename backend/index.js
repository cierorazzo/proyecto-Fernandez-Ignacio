const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const productRouter = require("./routes/prodRoute");
const categoryRouter = require("./routes/categoryRoute");
const cartRouter = require("./routes/cartRoute");

dbConnect();

//habilitar CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de rutas estáticas para servir imágenes
app.use("/backend/images", express.static(path.join(__dirname, "images")));

//llamado para interactuar con LOGIN y CARRITO DE COMPRA(gral)
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
