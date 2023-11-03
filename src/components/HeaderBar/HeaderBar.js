import css from "./HeaderBar.module.css";
export const HeaderBar = () => {
  return (
    <nav className={css.navbar}>
      <div className={css.logoContainer}>
        <img src={logo} className={css.logo} alt="Logo" />
      </div>
    </nav>
  );
};