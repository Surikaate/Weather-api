import { Router } from "express";
import axios from "axios";
const router = Router();

//Dangerous to keep here, should be kept in env file for security purpose
const token =
  "ce3f9e80a67aafb9c8f02ad0328714a2591c79244122b41695d61cbdea7c345f";

import db from "./../database/index.js";

/* GET all cities route */
router.get("/api/cities", (req, res, next) => {
  db.all("select * from city").then((rows) => {
    res.send(rows);
  });
});

router.get("/api/forecast", (req, res, next) => {
  const { insee } = req.query;
  db.get("select * from forecast where insee = " + insee + ";").then((rows) => {
    if (rows === undefined) {
      const baseURL =
        "https://api.meteo-concept.com/api/forecast/daily?insee=" + insee; //base URL Should be kept in env file for security purpose

      axios
        .get(baseURL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = {
            insee : response.data.city.insee,
            date : response.data.update,
            details: response.data.forecast,
          }

          //Insert data to DB here

          res.send(data);
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    } else {
      res.send(rows);
    }
  });
});

export default router;

// const datas = ({
//   "id": 1,
//   "insee": "06004",
//   "name": "ANTIBES",
//   "zipcode": "06160",
//   "population": 73798
// },
// {
//   "id": 2,
//   "insee": "06029",
//   "name": "CANNES",
//   "zipcode": "06400",
//   "population": 74152
// })
