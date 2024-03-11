const express = require("express");
const axios = require("axios");
const router = require("./course");

const CHAT_ENGINE_PROJECT_ID = "c162cb4c-5212-4dda-ac47-faa2cd81d72a";
const CHAT_ENGINE_PRIVATE_KEY = "6286a755-d30f-4b19-bd13-7d076104243d";

router.post("/signup", async (req, res) => {
  try {
    const r = await axios.post(
    "https://api.chatengine.io/users/",
    { username:req.body.email, secret:req.body.email, email:req.body.email, first_name:req.body.first_name, last_name:req.body.last_name },
    { headers: { "Private-Key": CHAT_ENGINE_PRIVATE_KEY } }
    );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response.status).json(e.response.data);
    }
});

router.post("/login", async (req, res) => {
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
    headers: {
        "Project-ID": CHAT_ENGINE_PROJECT_ID,
        "User-Name": req.body.username,
        "User-Secret": req.body.username,
    },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

module.exports = router;