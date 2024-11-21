import express from "express";
import cors from "cors";
import sequelize from "../sequelize.config";
import router from "./routes";
import seedCategories from "../seedCategories";
import bodyParser from "body-parser";

const initDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        // await seedCategories();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

initDb()

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// define bigger limit for file upload
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(router);