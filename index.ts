import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import morgan from "morgan";

const port = 3300;
const app = express();
const corsConfig = { origin: "*", optionsSuccessStatus: 200 };

app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req: Request, res: Response) => {
  try {
    const { url, method, header, body } = req.body;
    console.log(req.body);
    const { headers, config, data, status, statusText } = await axios({
      url,
      method: method || "GET",
      headers: header,
      data: body,
    });

    return res.send({ headers, config, data, status, statusText });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.use("/", (req: Request, res: Response) => {
  res.send({ message: "Api is working fine." });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
