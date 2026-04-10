const express = require('express');
const path = require('path');
const fs = require('fs'); // បន្ថែមសម្រាប់ Scan ហ្វាយល៍
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

// API សម្រាប់ Scan រូបភាព និងវីដេអូដោយស្វ័យប្រវត្តិ
app.get('/api/media', (req, res) => {
    const mediaList = [];
    const imageDir = path.join(__dirname, 'Image');
    const videoDir = path.join(__dirname, 'Video');

    // Scan រូបភាព
    if (fs.existsSync(imageDir)) {
        fs.readdirSync(imageDir).forEach(file => {
            if (file.match(/\.(jpg|jpeg|png|gif|jfif|webp)$/i)) {
                mediaList.push({ type: "image", src: `Image/${file}`, alt: file });
            }
        });
    }

    // Scan វីដេអូ
    if (fs.existsSync(videoDir)) {
        fs.readdirSync(videoDir).forEach(file => {
            if (file.match(/\.(mp4|webm|ogg)$/i)) {
                mediaList.push({ type: "video", src: `Video/${file}`, alt: file });
            }
        });
    }

    res.json(mediaList);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});