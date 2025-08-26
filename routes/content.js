import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Simple JWT auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Demo content
const STORIES = [
  {
    title: "The Midnight Library",
    body: "At 12:01, the shelves whispered. Pages fluttered like moths... and Nora realized every choice was a door she could still open."
  },
  {
    title: "TukTuk to the Stars",
    body: "In a dusty lane of Jaipur, Aman tuned his grandfather’s radio—and caught a broadcast from Mars asking for chai."
  },
  {
    title: "Echoes in the Monsoon",
    body: "The first raindrop hit the old temple bell. By the time it stopped ringing, Meera remembered the future she had forgotten."
  }
];

const SONGS = [
  {
    title: "Gentle Dawn (3s sample)",
    artist: "SampleLib",
    url: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
  },
  {
    title: "Uplift (6s sample)",
    artist: "SampleLib",
    url: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3"
  },
  {
    title: "City Lights (12s sample)",
    artist: "SampleLib",
    url: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3"
  },
  {
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    url: "https://pagalfree.com/musics/128-Tum%20Hi%20Ho%20-%20Aashiqui%202%20128%20Kbps.mp3"
  },
  {
    title: "Kesariya",
    artist: "Arijit Singh",
    url: "https://pagalfree.com/musics/128-Kesariya%20-%20Brahmastra%20128%20Kbps.mp3"
  },
  {
    title: "Tera Ban Jaunga",
    artist: "Akhil Sachdeva & Tulsi Kumar",
    url: "https://pagalfree.com/musics/128-Tera%20Ban%20Jaunga%20-%20Kabir%20Singh%20128%20Kbps.mp3"
  },
  {
    title: "Shayad",
    artist: "Arijit Singh",
    url: "https://pagalfree.com/musics/128-Shayad%20-%20Love%20Aaj%20Kal%20128%20Kbps.mp3"
  },
  {
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal & Asees Kaur",
    url: "https://pagalfree.com/musics/128-Raataan%20Lambiyan%20-%20Shershaah%20128%20Kbps.mp3"
  },
  {
    title: "Tum Ho",
    artist: "Mohit Chauhan",
    url: "https://pagalfree.com/musics/128-Tum%20Ho%20-%20Rockstar%20128%20Kbps.mp3"
  },
  {
    title: "Saiyaara",
    artist: "Mohit Chauhan, Tarannum Malik",
    url: "https://pagalfree.com/musics/128-Saiyaara%20-%20Ek%20Tha%20Tiger%20128%20Kbps.mp3",
  },
  {
    title: "Barbaad",
    artist: "Arijit Singh",
    url: "https://pagalfree.com/musics/128-Barbaad%20-%20Arijit%20Singh%20128%20Kbps.mp3"
  },
  {
    title: "Mann Mera",
    artist: "Gajendra Verma",
    url: "https://pagalfree.com/musics/128-Mann%20Mera%20-%20Table%20No%2021%20128%20Kbps.mp3",
  },
  {
    title: "Attention",
    artist: "Charlie Puth",
    url: "https://pagalfree.com/musics/128-Attention%20-%20Charlie%20Puth%20128%20Kbps.mp3",
  },
  {
    title: "Daylight",
    artist: "David Kushner",
    url: "https://pagalfree.com/musics/128-Daylight%20-%20David%20Kushner%20128%20Kbps.mp3",
  }


];

router.get("/random-story", requireAuth, (req, res) => {
  const item = STORIES[Math.floor(Math.random() * STORIES.length)];
  res.json(item);
});

router.get("/random-song", requireAuth, (req, res) => {
  const item = SONGS[Math.floor(Math.random() * SONGS.length)];
  res.json(item);
});

export default router;
