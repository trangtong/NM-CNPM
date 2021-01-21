const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PWD);
mongoose
	.connect(db, {
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connect to database successful"));

// Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, "", () => console.log("App is running on port 8002"));
