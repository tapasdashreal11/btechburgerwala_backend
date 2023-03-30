import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.get("/", (req, res, next) => {
  res.send("<h1>Server is On!</h1>");
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is listening to port ${process.env.PORT}`)
);
