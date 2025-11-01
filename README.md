# AICrafter 🎨✨

AICrafter is an AI-powered UI component generator that helps you create modern, responsive web components instantly. Simply describe what you want, select your framework, and let AI generate clean, production-ready code for you.

## Features

- 🤖 **AI-Powered Generation** - Leverages Google's Gemini AI to generate high-quality UI components
- 🎨 **Multiple Frameworks** - Support for HTML+CSS, Tailwind CSS, Bootstrap, and JavaScript
- 🌓 **Dark Mode** - Built-in dark/light theme toggle
- 📝 **Code Editor** - Integrated Monaco Editor with syntax highlighting
- 👁️ **Live Preview** - Real-time preview of generated components
- 📥 **Export Code** - Download generated code as HTML files
- 📋 **Copy to Clipboard** - Quick copy functionality for generated code
- 🪟 **Fullscreen Preview** - View components in fullscreen mode

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository
```bash
git clone <your-repo-url>
cd aicrafter
```

2. Install dependencies
```bash
npm install
```

3. Install required packages
```bash
npm install react-router-dom react-icons react-select @monaco-editor/react react-toastify @google/genai lucide-react react-spinners
```

4. Start the development server
```bash
npm run dev
```

## Tech Stack

- **Frontend Framework:** React + Vite
- **Routing:** React Router DOM
- **UI Components:** React Select, React Icons, Lucide React
- **Code Editor:** Monaco Editor
- **AI Integration:** Google Gemini AI (@google/genai)
- **Notifications:** React Toastify
- **Styling:** Tailwind CSS

## Usage

1. **Select Framework** - Choose your preferred framework from the dropdown (HTML+CSS, Tailwind, Bootstrap, etc.)
2. **Describe Component** - Enter a description of the UI component you want to create
3. **Generate** - Click the "Generate Component" button
4. **View & Edit** - Switch between Code and Preview tabs
5. **Export** - Copy code to clipboard or download as an HTML file

## Project Structure

```
aicrafter/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── NoPage.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   └── App.jsx
├── public/
└── package.json
```

## Features in Detail

### Dark Mode
Toggle between light and dark themes with a single click. Theme preference is saved across sessions.

### Code Editor
Powered by Monaco Editor (VS Code's editor), featuring:
- Syntax highlighting
- Auto-indentation
- Line numbers
- Theme sync with app theme

### Live Preview
See your generated component in real-time with an embedded iframe preview.

Made with ❤️ using React and AI
