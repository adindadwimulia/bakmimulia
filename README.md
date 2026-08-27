# 🍜 Bakmi Mulia

**Portal belajar & diskusi desain web** — HTML, CSS, JavaScript, JSON.  
Siap deploy ke **GitHub Pages**.

---

## Fitur

- 📚 **Materi Belajar** — HTML, CSS, JS, JSON, Deploy (data dari `data/lessons.json`)
- 💬 **Forum Diskusi** — tanya jawab santai (data dari `data/discussions.json` + form simulasi)
- 🎨 **Showcase** — inspirasi karya komunitas
- 🌙 **Desain modern minimalis** — dark theme, brand color **Burgundy · Black · Gold**
- 📦 **JSON-driven content** — praktik real load data di static site
- 📱 **Fully responsive**

---

## Struktur Folder

```
bakmi-mulia/
├── index.html          # Beranda
├── materi.html         # Daftar materi
├── diskusi.html        # Forum diskusi
├── showcase.html       # Karya komunitas
├── about.html          # Tentang & cara deploy
├── css/
│   └── style.css
├── js/
│   └── app.js
├── data/
│   ├── lessons.json
│   └── discussions.json
└── README.md
```

---

## Cara Deploy ke GitHub Pages

1. Buat repository baru di GitHub (contoh: `bakmi-mulia`)
2. Upload semua file di folder ini ke repository
3. Buka **Settings → Pages**
4. Source: branch `main` (atau `master`), folder `/ (root)`
5. Save — website live di:
   ```
   https://USERNAME.github.io/bakmi-mulia/
   ```

> Semua path sudah relative, jadi aman di-deploy.

---

## Brand Color

| Warna       | Hex       |
|-------------|-----------|
| Burgundy    | `#6B1E2A` |
| Black       | `#0A0A0A` |
| Gold        | `#C9A84C` |

---

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (Fetch API, localStorage)
- JSON

---

Made with ❤️ for web learners.
