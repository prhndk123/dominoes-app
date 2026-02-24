import { useState } from "react";

type ControlsProps = {
  onSortAsc: () => void;
  onSortDesc: () => void;
  onRemoveDuplicate: () => void;
  onFlip: () => void;
  onRemoveByTotal: (total: number) => void;
  onReset: () => void;
};

export function Controls({
  onSortAsc,
  onSortDesc,
  onRemoveDuplicate,
  onFlip,
  onRemoveByTotal,
  onReset,
}: ControlsProps) {
  const [removeTotalInput, setRemoveTotalInput] = useState("");

  const handleRemove = () => {
    const total = parseInt(removeTotalInput, 10);
    if (!isNaN(total)) {
      onRemoveByTotal(total);
      setRemoveTotalInput("");
    }
  };

  return (
    <div className="section-card">
      <h2 className="section-title">Controls</h2>
      <div className="controls-grid">
        <button className="btn btn-primary" onClick={onSortAsc}>
          Sort (ASC)
        </button>
        <button className="btn btn-primary" onClick={onSortDesc}>
          Sort (DESC)
        </button>
        <button className="btn btn-warning" onClick={onFlip}>
          Flip
        </button>
        <button className="btn btn-danger" onClick={onRemoveDuplicate}>
          Remove Duplicate
        </button>
        <button className="btn btn-primary" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="input-group" style={{ marginTop: "1rem" }}>
        <input
          className="input-field"
          type="number"
          placeholder="Input Number"
          value={removeTotalInput}
          onChange={(e) => setRemoveTotalInput(e.target.value)}
          style={{ width: "140px" }}
        />
        <button className="btn btn-danger" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
