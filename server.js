const express = require('express');
const axios = require('axios');
require('dotenv').config();

const OpenAI = require('openai');
const openai = new OpenAI();
const apiKey = process.env.OPENAI_API_KEY;
openai.apiKey = apiKey;

const app = express();

app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/image', async (req, res) => {
    const { city, weather } = req.query;
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Give image of ${city} with ${weather} weather`,
            size: '1024x1024'
        });
        image_url = response.data[0].url;
        res.json({ image_url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
