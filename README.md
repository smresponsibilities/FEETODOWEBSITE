# TaskFlow & Daily Quotes — Frontend Task Management Web App

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic_Layout-E34F26?style=for-the-badge&logo=html5)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?style=for-the-badge&logo=css3)](https://www.w3.org/TR/CSS/)
[![Storage](https://img.shields.io/badge/Persistence-Browser_LocalStorage-brightgreen?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

A responsive, zero-framework productivity dashboard and task manager built with vanilla JavaScript, HTML5, and modern CSS. Features task categorization, completion tracking, collapsible sidebar navigation, daily motivational quote rotation, and persistent client-side data storage.

Live App / Demo: [https://shivammahajan.com/FEETODOWEBSITE/](https://shivammahajan.com/FEETODOWEBSITE/)  
Portfolio Architecture: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [DOM Mutation & State Lifecycle](#dom-mutation--state-lifecycle)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
- [Usage](#usage)
  - [Creating & Managing Tasks](#creating--managing-tasks)
  - [Daily Quotes Rotation](#daily-quotes-rotation)
- [Performance & Footprint Benchmarks](#performance--footprint-benchmarks)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Modern web applications frequently default to heavy single-page application (SPA) frameworks for simple CRUD user interfaces. This introduces megabytes of build dependencies, hydration delays, and complex state management boilerplate.

**TaskFlow** demonstrates the power and simplicity of vanilla Web API standards. By combining direct DOM manipulation with `Window.localStorage`, it delivers instant task scheduling, completion strikes, and quote inspiration without requiring a build step, external package manager, or database.

### Target Audience
- **Web Development Students**: Learn essential DOM manipulation, event delegation patterns, and client-side storage persistence in vanilla JavaScript.
- **Minimalist Developers**: Fast, distraction-free daily task management tool running entirely offline.
- **Frontend Engineers**: Study clean CSS layout techniques utilizing Flexbox, custom variables, and responsive sidebar navigation.

---

## Features

- **Interactive Task CRUD**: Add, check off, and delete daily tasks with visual state changes.
- **Zero-Dependency Core**: 100% pure vanilla JavaScript, semantic HTML5, and responsive CSS.
- **LocalStorage Data Persistence**: Automatically serializes tasks to browser storage to survive tab reloads and system restarts.
- **Daily Quotes Module**: Dedicated motivational quotes view with randomized inspiration algorithms.
- **Collapsible Sidebar Layout**: Clean multi-view navigation with responsive collapse for mobile viewports.

---

## How It Works

### DOM Mutation & State Lifecycle

```
[User Input: New Task] ──► [Event Listener: submit]
                                    │
                                    ▼
                         [Validate Input Length]
                                    │
                                    ▼
                         [Create DOM Element]
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
        [Append to Task List DOM]           [Serialize to JSON]
        (Instant visual feedback)                     │
                                                      ▼
                                            [localStorage.setItem]
                                            (Permanent persistence)
```

---

## File Structure

```
FEETODOWEBSITE/
├── index.html          # Main application dashboard and task view
├── quotes.html         # Daily motivational quotes view
├── script.js           # Core task creation, deletion, and storage logic
├── quotesjs.js         # Quotes dataset, randomizer, and render handlers
├── style.css           # Global stylesheet, sidebar styling, and card themes
└── README.md
```

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge).
- No Node.js or npm needed!

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/FEETODOWEBSITE.git
   cd FEETODOWEBSITE
   ```
2. Open `index.html` directly in your browser:
   - On Windows: Double-click `index.html` or run `start index.html`
   - On macOS: Run `open index.html`
   - On Linux: Run `xdg-open index.html`

---

## Usage

### Creating & Managing Tasks
1. Navigate to the **Tasks** section on the main page.
2. Type your task title in the input field and press `Enter` or click **Add**.
3. Click the checkbox next to any task to toggle its completed state.
4. Click the delete icon to remove the task from both the DOM and `localStorage`.

### Daily Quotes Rotation
1. Click **Quotes** on the sidebar.
2. View the curated daily quote or click **Generate Next Quote** for randomized inspiration.

---

## Performance & Footprint Benchmarks

- **Total Bundle Size**: **< 20 KB** total assets uncompressed.
- **First Contentful Paint (FCP)**: **< 15 milliseconds**.
- **Memory Footprint**: Under **8 MB** browser heap allocation.

---

## Future Scope and Improvements

- **Drag-and-Drop Reordering**: Integrate native HTML5 Drag and Drop API for manual priority sorting.
- **Category Tags & Due Dates**: Filter tasks by work, personal, and urgent priority tags.
- **Progressive Web App (PWA)**: Add service worker caching and manifest for offline installation on mobile home screens.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
