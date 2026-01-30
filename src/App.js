import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleChange = (delta) => {
    const before = count;
    const after = count + delta;

    const action = {
      label: delta > 0 ? `+${delta}` : `${delta}`,
      before,
      after,
    };

    setCount(after);
    setHistory((prev) => [action, ...prev].slice(0, 50)); // keep max 50
    setRedoStack([]); // clear redo on new action
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const [lastAction, ...rest] = history;
    setCount(lastAction.before);
    setHistory(rest);
    setRedoStack((r) => [lastAction, ...r]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const [redoAction, ...rest] = redoStack;
    setCount(redoAction.after);
    setHistory((h) => [redoAction, ...h]);
    setRedoStack(rest);
  };
  return (
    <div style={{ padding: "1rem", fontFamily: "Arial", maxWidth: 400 }}>
      <h2>Count: {count}</h2>
      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        {[1, 10, 100].map((n) => (
          <button key={`+${n}`} onClick={() => handleChange(n)}>
            +{n}
          </button>
        ))}
        {[1, 10, 100].map((n) => (
          <button key={`-${n}`} onClick={() => handleChange(-n)}>
            -{n}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        <button onClick={handleUndo} disabled={history.length === 0}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={redoStack.length === 0}>
          Redo
        </button>
      </div>
      <h3>History</h3>
      <ul>
        {history.map((action, idx) => (
          <li key={idx}>
            {action.label} ({action.before} → {action.after})
          </li>
        ))}
      </ul>
    </div>
  );
}
