import app from "./app.js";
import model from "./models/index.js";
// import router from "./routes/index.route.js";

// app.use("/api", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
