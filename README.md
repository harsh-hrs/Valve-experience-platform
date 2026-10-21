<div align="center">

# Valve Experience Platform

**The first prototype of [ValveHub](https://github.com/harsh-hrs/valve-knowledge-hub): exploring valve anatomy in interactive 3D.**

![React](https://img.shields.io/badge/React_19-0B1120?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-0B1120?style=for-the-badge&logo=vite&logoColor=A78BFA)
![Three.js](https://img.shields.io/badge/Three.js-0B1120?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-0B1120?style=for-the-badge&logo=reactrouter&logoColor=F44250)

</div>

> [!NOTE]
> This was an early experiment. Development continues in **[valve-knowledge-hub](https://github.com/harsh-hrs/valve-knowledge-hub)**. You can try it live at [valve-knowledge-hub.pages.dev](https://valve-knowledge-hub.pages.dev).

## ✨ Features

- **Valve catalog:** pick a gate or globe valve to explore
- **3D viewer:** orbit around each valve, with studio lighting and soft contact shadows
- **Clickable parts:** select a component to see its function, material and common failure modes
- **Exploded view:** pull the assembly apart to see how the parts fit together
- **Operate mode:** watch the valve open and close

## 🧱 Tech stack

React 19 · Vite · React Router 7 · Three.js · React Three Fiber + Drei · Lucide icons

## 🚀 Getting started

```bash
git clone https://github.com/harsh-hrs/Valve-experience-platform.git
cd Valve-experience-platform
npm install
npm run dev
```

Then open the local URL that Vite prints (usually [http://localhost:5173](http://localhost:5173)).

## 🗂️ Project structure

```text
src/
├─ pages/        # Home, Catalog, ValveViewer
├─ components/   # ValveModel, Sidebar, UIOverlay
└─ data/         # valves.js: parts, materials and failure modes
```

## 👤 Author

Created by **Harsh Raj Singh** ([@harsh-hrs](https://github.com/harsh-hrs)).
