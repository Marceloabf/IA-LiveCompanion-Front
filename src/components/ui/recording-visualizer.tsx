export function RecordingVisualizer() {
  const bars = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="flex h-10 items-end gap-[2px]">
      {bars.map((i) => (
        <span
          className="h-3 w-1 animate-line-pulse bg-green-500"
          key={i}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
