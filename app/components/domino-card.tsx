type DominoCardProps = {
  top: number;
  bottom: number;
};

export function DominoCard({ top, bottom }: DominoCardProps) {
  return (
    <div className="domino-card">
      <div className="domino-number">{top}</div>
      <div className="domino-divider" />
      <div className="domino-number">{bottom}</div>
    </div>
  );
}
