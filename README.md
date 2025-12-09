# NExA — Multifunctional Discord Bot (Legacy Project)

NExA is a feature-rich Discord bot I built around 4 years ago, designed to handle music playback, media scraping, community utilities, and automated moderation.  
The bot was developed using **Node.js** and **discord.js v12**, along with several supporting libraries that powered audio streaming, API integrations, and content extraction.

> **Note:** Many of the libraries and APIs used in this project — including `discord.js v12`, `discord-player v3`, `node-fetch v2`, and `request` — are now **deprecated**.  
> This repository exists as a legacy reference and is not actively maintained.

---

## ✨ Features

- 🎵 **Music Playback**  
  Supports YouTube, SoundCloud, Spotify links, playlists, and search-based playback.

- 🖼️ **Canvas-Based Image Generation**  
  Custom images, profile cards, and visual utilities using the `canvas` library.

- 📥 **Media & Web Scraping**  
  Retrieves and parses content using `cheerio`, enabling commands tied to web data.

- 🔗 **API Integrations**  
  - **Reddit** via `snoowrap`  
  - **SoundCloud** via `soundcloud-scraper`  
  - **Spotify** metadata via `spotify-url-info`

- ⏱️ **Utility Commands**  
  Timestamp formatting, scheduling, message embeds, and more via `moment`.

- 🎶 **Advanced Audio Pipeline**  
  Custom decoder support using `@discordjs/opus` and fallback to `opusscript`.

---

## 🛠️ Tech Stack (Legacy)

**Language / Runtime**
- Node.js

**Core Framework**
- `discord.js` **v12.5.1** *(deprecated)*  
- `discord-player` **v3.2.1** *(deprecated)*

**Audio / Media**
- `discord-ytdl-core`, `ytdl-core`, `youtube-sr`, `ytpl`, `ytsr`
- `@discordjs/opus`, `opusscript`
- `soundcloud-scraper`

**Web & APIs**
- `node-fetch` **v2** *(deprecated)*
- `request` *(deprecated)*
- `cheerio`
- `snoowrap`
- `spotify-url-info`

**Utilities**
- `moment`, `merge-options`, `canvas`

---

## ⚠️ Deprecation Notice

This project was built on an older Discord API era.  
Due to major breaking changes in newer Discord API versions and the deprecation of many libraries used here, **NExA is no longer maintained**.  
The repository serves as an archival/learning reference.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Ishit**  
Creator & Maintainer (original)
