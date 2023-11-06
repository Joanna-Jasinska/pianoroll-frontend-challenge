import { Outlet } from "react-router-dom";
import css from "./SharedLayout.module.css";
import { HeaderBar } from "../HeaderBar/HeaderBar";
export const SharedLayout = () => {
  return (
    <>
      <HeaderBar />
      <main className={css.pageContent} id="home">
        <Outlet />
      </main>
    </>
  );
};
export default SharedLayout;
