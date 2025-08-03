# 🧹 AHNY'S CHORE MANAGER

## Simple, Interactive Task Management with Filters, Sorting & State Persistence

---

### 🪪 Introduction

**AHNY's Chore Manager** is a responsive and minimalist task management app built using **React** and the **`useState` hook**, designed to help users manage chores efficiently. You can add, filter, delete, clear, and rearrange tasks. Whether you're looking for a simple way to track to-dos or a solid base for a React learning project, this chore manager delivers high interactivity and clean component logic.

🔍Keywords:React chore manager, task manager app React, to-do list with filters, React task app with useState, filterable chore app, interactive task list in React, beginner React project.

---

### ⚙️ App Features (Diagram & Explanation)

```
+---------------------+        +-----------------------+
|   Task Input Form   |---->-->|     Task List Area    |
|  - Add title        |        |  - View tasks         |
|  - Add description  |        |  - Mark complete/undo |
|  - Submit button    |        |  - Move up/down       |
+---------------------+        |  - Delete task        |
                               +-----------------------+
                                 |
                                 V
                          +------------------+
                          |   Filter Panel   |
                          | - Filter by done |
                          | - Clear filters  |
                          +------------------+

                          +---------------------------+
                          | Task Summary and Cleaner  |
                          | - View count              |
                          | - Clear completed tasks   |
                          +---------------------------+
```

Built entirely in **React** with no external state management, it uses local component state via `useState()` to handle:

- Task list updates
- Input field states
- Filter state (null, completed, or not completed)

---

### 🧰 Installation – For End Users

**Requirements:** Node.js & npm installed

```bash
git clone git@github.com:Ahny678/Chore-Manager.git
cd Chore-Manager
npm install
npm run dev
```

➡️ Open your browser and go to `http://localhost:5173/` to start using the app.

---

### 💻 Installation – For Developers (Contributors)

1. Same process for users
2. Clone your fork
3. Run linter

```bash
npm run lint
```

---

### 🙌 Contribution Guidelines

We welcome contributions! Here’s what we expect:

- Keep code clean and readable
- Use descriptive commit messages
- Stick to React conventions and avoid unnecessary state complexity
- Update or add components only if necessary – this is a just small utility app
- CSS should go inside `Task.module.css` unless structural changes require global styles

For features or bugs, please open an issue first before submitting a PR.

---

### 🧠 Known Issues / Limitations

- ❌ No persistent storage – tasks reset on page reload
- ❌ No mobile optimization – UI might not be fully responsive on smaller screens
- ❌ No confirmation before deletion or clearing tasks
- 🔄 Drag-and-drop support not implemented (only manual up/down reordering)
