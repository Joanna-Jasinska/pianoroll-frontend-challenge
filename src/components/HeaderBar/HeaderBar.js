import css from "./HeaderBar.module.css";
export const HeaderBar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} className="logo" alt="Logo" />
      </div>
    </nav>
  );
};
