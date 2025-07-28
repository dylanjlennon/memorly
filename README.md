# Memorly – Personal Memory Capture MVP

Memorly is a simple web application that lets you record voice notes or type out your thoughts, then stores them alongside AI‑generated summaries and tags.  This project draws inspiration from the polished look and thorough documentation of [Go‑Lucky](https://goluckycode.org/) while staying focused on capturing personal memories.

## 📦 Project Structure

```
memorly-mvp/
├── index.html       # The main HTML page
├── styles.css       # Global styles for the landing page and app
├── app.js           # Client‑side JavaScript logic
├── README.md        # This file
└── docs/
    └── data-model.md  # Explanation of the memory data structure
```

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/memorly-mvp.git
   cd memorly-mvp
   ```

2. **Open `index.html` in your browser**

   Memorly is a static site and requires no build tools.  Open `index.html` directly in your favourite browser to explore the interface.

3. **Configure Supabase (optional)**

   This MVP includes placeholder functions for integrating with [Supabase](https://supabase.com/docs/guides).  To enable real storage:

   - Create a Supabase project and obtain your API keys.
   - Replace the `SUPABASE_URL` and `SUPABASE_ANON_KEY` constants in `app.js` with your actual credentials.
   - Ensure you have a `memories` table with the columns described in `docs/data-model.md` and a private storage bucket named `audio` (or adjust the bucket name in `app.js`).

## 🧠 How It Works

1. **Voice & Text Capture** – The landing page features two buttons.  Clicking **Record Memory** opens a modal that uses the browser’s MediaRecorder API to capture audio.  Clicking **Add Text Memory** displays a textarea for typed notes.

2. **Data Model** – Each memory record follows a simple, scalable schema with fields like `id`, `source_type`, `title`, `raw_content`, `summary`, `tags`, `publish_context`, `audio_url`, and `created_at`.  See [`docs/data-model.md`](docs/data-model.md) for full details.

3. **AI Processing** – After a memory is submitted, an AI service (e.g., ElevenLabs Scribe for transcription and OpenAI for summarization) can process the record.  These integrations are left as placeholders in `app.js`.

4. **Supabase Integration** – The functions `saveMemory()` and `uploadAudio()` in `app.js` demonstrate how you might store text and audio in Supabase.  They currently log data to the console for demonstration.

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [How It Works](#-how-it-works)
- [Data Model](docs/data-model.md)
- [Contributing](#-contributing)
- [License](#-license)

## 🤝 Contributing

Contributions are welcome!  If you have ideas to improve the interface, add features, or enhance documentation, please open an issue or submit a pull request.

Before contributing, please read the [Code of Conduct](https://github.com/dylanjlennon/gayavl/blob/main/CODE_OF_CONDUCT.md) for guidelines on respectful collaboration.

## 🪪 License

This project is licensed under the [MIT License](LICENSE).
