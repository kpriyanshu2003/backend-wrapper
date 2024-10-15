import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import morgan from "morgan";

const port = 3000;
const app = express();
const corsConfig = { origin: "*", optionsSuccessStatus: 200 };

app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req: Request, res: Response) => {
  try {
    const { url, method, headerr, body } = req.body;
    const header = { ...headerr, "Content-Type": "application/json" };

    const { headers, config, data, status, statusText } = await axios({
      url,
      method: "GET",
      headers: header,
      // data: body,
    });

    return res.send({ status, statusText, headers, config, data });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
