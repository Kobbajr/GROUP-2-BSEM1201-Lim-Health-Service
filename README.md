# Lim Health Service

A modern, responsive healthcare web application built for Group 2. Lim Health Service connects patients with certified medical specialists, enabling seamless appointment booking, profile management, and access to health records — all in one secure platform.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Pages](#pages)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Team](#team)
- [License](#license)

---

## Overview

Lim Health Service is a front-end web project that simulates a digital health platform. It includes a splash screen, authentication, a home page, service listings, doctor profiles, appointment booking, user profile management, and an about page.

---

## Pages

| File | Description |
|------|-------------|
| `splash.html` | Animated loading/splash screen |
| `index.html` | Entry point — redirects to splash |
| `main.html` | Home page with hero, doctors, services, reviews |
| `auth.html` | Login and registration forms |
| `services.html` | Full catalog of available medical services |
| `doctors-detail.html` | Doctor listings with search and specialty filters |
| `book-appointment.html` | Multi-step appointment booking form |
| `profile.html` | Patient dashboard with appointments, records, prescriptions, and settings |
| `about-us.html` | Company story, mission, team, and awards |

---

## Features

- Splash screen with animated ECG line and progress bar
- Login / Register with password strength meter and social auth buttons
- Hero section with animated heart visual and floating stat cards
- Doctor cards with expandable profiles and specialty filtering
- Multi-step appointment booking with time slot selection
- Patient profile dashboard with:
  - Live settings update (name/email sync to sidebar)
  - Appointment management with filter tabs
  - Medical records and prescriptions
  - Animated health metric bars
- Fully responsive layout across all pages
- Consistent multi-column footer site-wide

---

## Project Structure

```
Group-2-Lim-Health-Service/
├── images/                  # All image assets
│   ├── Logo.png
│   ├── Dr. Sarah Mitchell.jpg
│   ├── Dr. James Olusegun.jpg
│   └── ...
├── splash.html / splash.css / splash.js
├── index.html
├── main.html / main.css / main.js
├── auth.html / auth.css / auth.js
├── services.html / services.css / services.js
├── doctors-detail.html / doctors-detail.css / doctors-detail.js
├── book-appointment.html / book-appointment.css / book-appointment.js
├── profile.html / profile.css / profile.js
├── about-us.html / about-us.css / about-us.js
├── README.md
└── LICENSE.md
```

---

## Getting Started

No build tools or dependencies required. This is a pure HTML, CSS, and JavaScript project.

1. Clone or download the repository.
2. Open `splash.html` (or `index.html`) in any modern web browser.
3. Navigate through the site using the header navigation.

```bash
# If you have VS Code with Live Server installed:
# Right-click splash.html → Open with Live Server
```

---

## Team

**Group 2 — Lim Health Service**

- Sahr Kobba
- Emmanuel Koroma
- Sylvanus Macauley 
---

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
