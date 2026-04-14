const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "data.json";

// Create file if not exists
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
}

// 🔮 Horoscope Route
app.post("/horoscope", async (req, res) => {
    const { name, sign, period } = req.body;

    const apiKey = "1qZfctiyXlX2w9wmbZzyv9kSZA6fvz6zmT427SOl"; // 🔑 put your API key

    const zodiacSign = sign.split(" ")[0].toLowerCase();

    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/horoscope?zodiac=${zodiacSign}`,
            {
                headers: { "X-Api-Key": apiKey }
            }
        );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const apiData = await response.json();
        const prediction = apiData.horoscope;

        // 🎲 Extra features
        const luckyNum = Math.floor(Math.random() * 100);
        const colors = ["Red 🔴", "Blue 🔵", "Green 🟢", "Purple 🟣"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const result = `Hello ${name} (${sign})

🗓 ${period.toUpperCase()} Horoscope:

${prediction}

🍀 Lucky Number: ${luckyNum}
🎨 Lucky Color: ${color}`;

        // Save history
        let history = JSON.parse(fs.readFileSync(FILE));
        history.push({
            name,
            sign,
            period,
            result,
            date: new Date().toLocaleString()
        });

        fs.writeFileSync(FILE, JSON.stringify(history, null, 2));

        res.json({ text: result });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            text: "❌ API Error (Check API key or internet)"
        });
    }
});

// 📜 History Route
app.get("/history", (req, res) => {
    try {
        const history = JSON.parse(fs.readFileSync(FILE));
        res.json(history);
    } catch {
        res.json([]);
    }
});

// ▶️ Start server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});