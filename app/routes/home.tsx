import { useState } from "react";
import { Controls } from "~/components/Controls";
import { DominoCard } from "../components/domino-card";
import { defaultDominoes } from "../data/dominoes";

export default function Home() {
  const [dominoes, setDominoes] = useState<[number, number][]>(defaultDominoes);

  // State for adding a new domino
  const [newDominoTop, setNewDominoTop] = useState("");
  const [newDominoBottom, setNewDominoBottom] = useState("");

  // State for updating via JSON
  const [jsonInput, setJsonInput] = useState("");

  // Derived: Double Numbers Counter
  const doubleNumbersCount = dominoes.filter(([a, b]) => a === b).length;

  const handleSortAsc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      if (sumA === sumB) {
        return a[0] - b[0];
      }
      return sumA - sumB;
    });
    setDominoes(sorted);
  };

  const handleSortDesc = () => {
    const sorted = [...dominoes].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      if (sumA === sumB) {
        return b[0] - a[0];
      }
      return sumB - sumA;
    });
    setDominoes(sorted);
  };

  const handleRemoveDuplicate = () => {
    const counts: Record<string, number> = {};
    const totalCounts: Record<number, number> = {};

    dominoes.forEach((d) => {
      const min = Math.min(d[0], d[1]);
      const max = Math.max(d[0], d[1]);
      const key = `${min}-${max}`;
      counts[key] = (counts[key] || 0) + 1;

      const total = d[0] + d[1];
      totalCounts[total] = (totalCounts[total] || 0) + 1;
    });

    const filtered = dominoes.filter((d) => {
      const min = Math.min(d[0], d[1]);
      const max = Math.max(d[0], d[1]);
      const key = `${min}-${max}`;
      const total = d[0] + d[1];

      return counts[key] === 1 && totalCounts[total] === 1;
    });
    setDominoes(filtered);
  };

  const handleFlip = () => {
    const flipped: [number, number][] = dominoes.map(([a, b]) => [b, a]);
    setDominoes(flipped);
  };

  const handleRemoveByTotal = (totalToRemove: number) => {
    const filtered = dominoes.filter(([a, b]) => a + b !== totalToRemove);
    setDominoes(filtered);
  };

  const handleReset = () => {
    setDominoes(defaultDominoes);
  };

  const handleAddDomino = () => {
    const a = parseInt(newDominoTop, 10);
    const b = parseInt(newDominoBottom, 10);
    if (!isNaN(a) && !isNaN(b)) {
      setDominoes([...dominoes, [a, b]]);
      setNewDominoTop("");
      setNewDominoBottom("");
    }
  };

  const handleUpdateJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item) =>
            Array.isArray(item) &&
            item.length === 2 &&
            typeof item[0] === "number" &&
            typeof item[1] === "number",
        )
      ) {
        setDominoes(parsed);
        setJsonInput("");
      } else {
        alert("Invalid format. Please use [[a,b], [c,d]]");
      }
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Dominoes</h1>

      <div className="section-card">
        <h2 className="section-title">Source Data</h2>
        <div className="code-block">{JSON.stringify(dominoes)}</div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "1rem",
          }}
        >
          {/* Add Domino Group */}
          <div className="input-group">
            <input
              className="input-field"
              style={{ width: "64px", textAlign: "center" }}
              type="number"
              placeholder="0"
              value={newDominoTop}
              onChange={(e) => setNewDominoTop(e.target.value)}
            />
            <span style={{ color: "var(--text-secondary)" }}>-</span>
            <input
              className="input-field"
              style={{ width: "64px", textAlign: "center" }}
              type="number"
              placeholder="1"
              value={newDominoBottom}
              onChange={(e) => setNewDominoBottom(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleAddDomino}>
              Add Card
            </button>
          </div>

          {/* Update Array Group */}
          <div className="input-group">
            <input
              className="input-field"
              style={{ width: "220px" }}
              type="text"
              placeholder="e.g. [[1,2], [3,4]]"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <button className="btn btn-warning" onClick={handleUpdateJson}>
              Update Array
            </button>
          </div>
        </div>
      </div>

      <div
        className="section-card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Double Numbers
        </h2>
        <div
          style={{
            background: "var(--accent-color)",
            color: "white",
            padding: "0.25rem 1rem",
            borderRadius: "99px",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          {doubleNumbersCount}
        </div>
      </div>

      <Controls
        onSortAsc={handleSortAsc}
        onSortDesc={handleSortDesc}
        onRemoveDuplicate={handleRemoveDuplicate}
        onFlip={handleFlip}
        onRemoveByTotal={handleRemoveByTotal}
        onReset={handleReset}
      />

      <div className="section-card">
        <h2 className="section-title">Board</h2>
        <div className="domino-list">
          {dominoes.map((d, i) => (
            <DominoCard key={i} top={d[0]} bottom={d[1]} />
          ))}
          {dominoes.length === 0 && (
            <div className="empty-state">
              No dominoes on the board. Add some or reset!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
