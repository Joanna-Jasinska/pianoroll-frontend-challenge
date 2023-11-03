import { Outlet } from "react-router-dom";
import css from "./SharedLayout.module.css";
export const SharedLayout = () => {
  return (
    <>
      {/* <HeaderBar /> */}
      <main className={css.pageContent} id="home">
        <Outlet />
      </main>
      {/* <footer className="footer" id="footer" /> */}
    </>
  );
};
export default SharedLayout;
