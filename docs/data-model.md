# Data Model

Memorly stores each memory in a single table named `memories`.  The table is designed to be flexible enough for many different kinds of memories while remaining consistent across entries.

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier generated on the client or server. |
| `source_type` | text | Either `voice` or `text`, indicating how the memory was captured. |
| `title` | text | A short title provided by the user or derived from the first sentence of `raw_content`. |
| `raw_content` | text | The full transcription of a voice memo or the text typed by the user. |
| `summary` | text | A brief AI‑generated summary of the memory. This can be `null` until processed. |
| `tags` | text[] (jsonb array) | Keywords extracted by AI to help organize and filter memories. |
| `publish_context` | text[] (jsonb array) | Indicates where the memory may be displayed (e.g., `blog`, `newsletter`, `about_page`). |
| `audio_url` | text | URL of the uploaded audio file in Supabase Storage.  Empty for text memories. |
| `created_at` | timestamptz | Timestamp when the record was created. |
| `approved` | boolean | Set to `false` until the user reviews and approves the AI‑generated summary and tags. |

## Why Use JSONB Arrays?

Supabase (built on PostgreSQL) supports both `json` and `jsonb` columns【958902948713703†L269-L282】.  `jsonb` is recommended because it stores data in a binary format for faster processing and allows indexing.  In this model, `tags` and `publish_context` are stored as `text[]` arrays, which are backed by `jsonb`, so they can grow and shrink without altering the table schema.

## Example Record

```json
{
  "id": "48c0e3e4-5c7f-4e1a-b3be-745efb5039cb",
  "source_type": "voice",
  "title": "Morning run in Montford",
  "raw_content": "I went for a run through Montford this morning...",
  "summary": "A quick jog through tree‑lined streets that evoked college memories.",
  "tags": ["running", "Montford", "outdoors"],
  "publish_context": ["blog", "about_page"],
  "audio_url": "https://xyz.supabase.co/storage/v1/object/public/audio/48c0e3e4-5c7f.mp3",
  "created_at": "2025-07-27T14:23:45.123Z",
  "approved": true
}
```

## Relationship to Personal Topics File

Once memories are approved, they can be exported or synced to a structured file (e.g., `personal_topics.json`) that your website uses to inject personal anecdotes.  The `publish_context` field controls where each memory may appear.
