export default function Badge({ variant = "neutral", icon, children }) {
  return (
    <span className={`badge badge--${variant}`}>
      {icon && <i className={`fas ${icon}`}></i>}
      {children}
    </span>
  );
}
