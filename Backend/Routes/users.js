const express = require("express");
const router = express.Router();
const users = require("../Model/users");

router.get("/", async (req, res) => {
  try {
    const userData = await users.find();

    // Filter the data according to the given conditions
    const filteredData = userData.filter((item) => {
      // Condition 1
      if (
        item.income < "$5" &&
        (item.car === "BMW" || item.car === "Mercedes")
      ) {
        return true;
      }

      // Condition 2
      if (item.gender === "Male" && item.phone_price > 10000) {
        return true;
      }

      // Condition 3
      if (
        item.last_name &&
        item.last_name.startsWith("M") &&
        item.quote.length > 15 &&
        item.email.includes(item.last_name)
      ) {
        return true;
      }

      // Condition 4
      if (
        (item.car === "BMW" ||
          item.car === "Mercedes" ||
          item.car === "Audi") &&
        !/\d/.test(item.email)
      ) {
        return true;
      }

      return false;
    });

    res.json(filteredData);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

module.exports = router;
