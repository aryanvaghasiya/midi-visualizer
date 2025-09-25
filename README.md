# 🎹 MIDI Player / Visualizer

A full-stack web application to **upload, play, and visualize MIDI files**.
The backend is built with **Java Spring Boot**, while the frontend is built with **React + TypeScript + Vite + TailwindCSS**, powered by **Tone.js** and **@tonejs/midi** for audio playback and MIDI parsing.

---

## ✨ Features

* 🎵 Upload and manage MIDI files from the frontend (stored in backend with H2 DB + local file storage).
* ⏯️ Play, pause, stop, and loop MIDI playback using **Tone.js**.
* 🎹 Interactive **Piano Roll Visualization** showing active notes in real-time.
* 🎚️ Per-track controls: mute/unmute and adjust volume.
* 🎼 Tempo (BPM) adjustment.
* 📦 Backend REST API for file upload, listing, download, and deletion.
* 🗄️ Uses in-memory H2 database for metadata storage.

---

## 🏗️ Project Structure

```
visualizer/                     # Root project
├── src/main/java/com/midivisualizer/  # Spring Boot backend
│   ├── config/                 # CORS configuration
│   ├── controller/             # REST controllers
│   ├── model/                  # JPA entities + repository
│   ├── service/                # File storage & business logic
│   └── MidiVisualizerApplication.java # Main Spring Boot entry
│
├── src/main/resources/
│   ├── application.yml         # App config (DB, port, upload dir)
│   └── application.properties
│
├── client/                     # React frontend
│   ├── components/             # UI components (PianoRoll, Sidebar, Controls, etc.)
│   ├── hooks/                  # Custom hooks (useMidiPlayer)
│   ├── lib/                    # MIDI parser utilities
│   ├── pages/                  # Main page (MidiPlayer)
│   ├── types/                  # TypeScript interfaces (Note, Track, Midi)
│   ├── App.tsx                 # Root React component
│   ├── index.tsx               # Entry point
│   └── vite.config.ts          # Vite config
│
├── pom.xml                     # Maven dependencies
└── README.md                   # This file
```

---

## 🚀 Getting Started

### 🔧 Backend (Spring Boot)

1. Navigate to backend root:

   ```bash
   cd visualizer
   ```

2. Run the Spring Boot app:

   ```bash
   mvn spring-boot:run
   ```

3. Backend will be available at:

   ```
   http://localhost:8081
   ```

   Useful endpoints:

   * `GET  /api/midi/health` → Health check
   * `POST /api/midi/upload` → Upload a MIDI file
   * `GET  /api/midi/files` → List all uploaded files
   * `GET  /api/midi/files/{id}/download` → Download file
   * `DELETE /api/midi/files/{id}` → Delete file

---

### 🎨 Frontend (React + Vite)

1. Open the frontend folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open the app in browser:

   ```
   http://localhost:5173
   ```

---

## 🖥️ Tech Stack

* **Backend**:

  * Spring Boot (Web, JPA, H2)
  * REST API
  * File storage

* **Frontend**:

  * React + TypeScript + Vite
  * TailwindCSS for styling
  * Tone.js for audio playback
  * @tonejs/midi for MIDI parsing

---
  <!--
## 📸 Screenshots (optional)
![A screenshot of the application's user interface](images/app_ui.png)

*Add screenshots of the piano roll, upload screen, and playback controls here.*

---
-->
