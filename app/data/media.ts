// Creative media shown on /overview (same sources as the Creative page).
// YouTube thumbnails are stored locally in public/creative, so no third-party image host is needed.

export const TIKTOK_PROFILE = "https://www.tiktok.com/@supreme_scaler";
export const WATTPAD_PROFILE = "https://www.wattpad.com/user/thejasonronin04";

export const YOUTUBE_VIDEOS = [
  { id: "mOXJ7O2TK7g", title: "Supernatural — Final Countdown" },
  { id: "CbtfkFj8w2w", title: "Multimale — Judas × Bad Romance mashup" },
  { id: "GBHMeo6_RRU", title: "Dead by Daylight" },
  { id: "ZNSGBp76rMc", title: "Elijah Mikaelson sings a song" },
  { id: "91gcmcC8Iu4", title: "Elijah Mikaelson — Rasputin" },
  { id: "0cuWso6pfyw", title: "Coraline Song" },
  { id: "eQm0Q2lxw00", title: "Peaky Blinders — Polozhenie" },
].map((video) => ({
  ...video,
  url: `https://www.youtube.com/watch?v=${video.id}`,
  thumbnail: `/creative/yt-${video.id}.jpg`,
}));

// "BlackList — Ranking All of Fiction" TikTok series. There are no per-video URLs, so they open the profile.
export const TIKTOK_VIDEOS = [
  { en: "Top 15 best horror characters", hu: "Top 15 legjobb horrorkarakter" },
  { en: "Top 15 smartest characters", hu: "Top 15 legokosabb karakter" },
  { en: "Top 17 strongest characters", hu: "Top 17 legerősebb karakter" },
  { en: "Top 17 best shows", hu: "Top 17 legjobb sorozat" },
  { en: "Liked The Mentalist? Watch these", hu: "Tetszett a Mentalista? Ezeket nézd" },
  { en: "The most skilled characters", hu: "A legképzettebb karakterek" },
];

export const WATTPAD_STORY = {
  title: "The Consultant",
  url: "https://www.wattpad.com/story/386494029-the-consultant",
  cover: "/creative/the-consultant.jpg",
};
