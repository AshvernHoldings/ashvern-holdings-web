type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export default function SealArc({
  size,
  corner,
}: {
  size: "large" | "small";
  corner: Corner;
}) {
  return (
    <svg
      className={`seal-arc seal-arc--${size} seal-arc--${corner}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="50" fill="var(--accent)" />
    </svg>
  );
}
