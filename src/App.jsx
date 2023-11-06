import { Route, Routes } from "react-router";
import { Suspense } from "react";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { PRollsPage } from "./pages/PRollsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Suspense fallback={"Loading Piano Rolls.."}>
      <Routes>
        <Route path="piano" element={<SharedLayout />} />
        <Route path="/" element={<PRollsPage />}>
          <Route index element={<PRollsPage />} />
          <Route path=":rollId" element={<PRollsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
