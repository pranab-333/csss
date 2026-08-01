/**
 * Shared button component.
 * variant: "primary" (red) | "ghost" | "outline" | "danger" | default (neutral)
 * size: "sm" | "md" | "lg"
 */
export default function Button({
  children,
  variant,
  size,
  fullWidth,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    variant ? `btn--${variant}` : "",
    size === "sm" ? "btn--sm" : "",
    size === "lg" ? "btn--large" : "",
    fullWidth ? "btn--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
