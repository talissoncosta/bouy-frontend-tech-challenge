import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AppPath, FullPageSpin } from "components";

const Dashboard = lazy(() => import("./dashboard"));
const BrandProfile = lazy(() => import("./brandProfile").then(m => ({ default: m.BrandProfile })));
const UserProfile = lazy(() => import("./userProfile").then(m => ({ default: m.UserProfile })));
const Users = lazy(() => import("./users").then(m => ({ default: m.UsersPage })));

export default function PagesRoutes() {
  return (
    <Suspense fallback={<FullPageSpin />}>
      <Routes>
        <Route path={AppPath.home} element={<Dashboard />} />
        <Route path={AppPath.brandProfile} element={<BrandProfile />} />
        <Route path={AppPath.userProfile} element={<UserProfile />} />
        <Route path={AppPath.users} element={<Users />} />
      </Routes>
    </Suspense>
  );
}
