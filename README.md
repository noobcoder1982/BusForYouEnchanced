# 🚌 BusForYouEnchanced (BUS4U)

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](./LICENSE)

Premium-themed MoBus booking experience built with React + Vite, featuring a cinematic landing page and a multi-step ticket booking flow for Bhubaneswar routes.

---

## ✨ Highlights

- Cinematic, animated landing page with dark/light theme toggle
- Multi-step booking flow:
  - Route & date selection
  - Bus/service selection
  - Seat selection
  - Passenger details
  - Payment step
  - Animated printable ticket/receipt output
- Rich UI motion using Framer Motion
- Mobile-friendly interactions and sticky CTAs

## 🛠 Tech Stack

- **Framework/UI:** React 18
- **Build Tool:** Vite 5
- **Routing:** React Router DOM
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Styling:** Custom CSS (`src/index.css`) + inline component styling

## 🚀 Setup & Installation

### Prerequisites

- Node.js **18.0.0+** (LTS recommended)
- npm

### Install

```bash
npm ci
```

## ▶️ Usage

### Run locally (development)

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 🧪 Development Notes

- `npm run lint` exists in `package.json`, but the repo currently does not include an ESLint config file.

## 📁 Project Structure (brief)

```text
BusForYouEnchanced/
├─ public/                     # Static images/assets
├─ src/
│  ├─ components/
│  │  ├─ booking/              # Seat selector, ticket printer, confetti, etc.
│  │  ├─ Hero.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Works.jsx
│  │  └─ ...
│  ├─ pages/
│  │  ├─ Booking.jsx           # Main multi-step booking journey
│  │  └─ Payment.jsx
│  ├─ App.jsx                  # App routes and theme logic
│  ├─ main.jsx                 # React entry point
│  └─ index.css                # Global styles/tokens
├─ index.html
├─ swiss.html / swiss.css      # Alternate static design page
├─ package.json
└─ LICENSE
```

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Make focused changes
4. Open a pull request with clear context/screenshots if UI is affected

## 📜 License

This project includes an **Apache License 2.0**. See [LICENSE](./LICENSE).

## 👤 Contact / Credits

Maintained by **[@noobcoder1982](https://github.com/noobcoder1982)**.
