
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root with React 18
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

// Set meta viewport for better 3D rendering
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(meta);

const root = createRoot(container);
root.render(<App />);
