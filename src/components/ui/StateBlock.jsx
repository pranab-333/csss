export default function StateBlock({ icon = "fa-circle-info", title, description }) {
  return (
    <div className="state-block">
      <i className={`fas ${icon}`}></i>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
