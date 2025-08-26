import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { AppPath } from "components";

const Dashboard = lazy(() => import("./dashboard"));
const BrandProfile = lazy(() => import("./brandProfile").then(m => ({ default: m.BrandProfile })));
const UserProfile = lazy(() => import("./userProfile").then(m => ({ default: m.UserProfile })));
const Users = lazy(() => import("./users").then(m => ({ default: m.UsersPage })));

function PageLoader() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '200px' 
    }}>
      <Spin size="large" />
    </div>
  );
}

export default function PagesRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={AppPath.home} element={<Dashboard />} />
        <Route path={AppPath.brandProfile} element={<BrandProfile />} />
        <Route path={AppPath.userProfile} element={<UserProfile />} />
        <Route path={AppPath.users} element={<Users />} />
      </Routes>
    </Suspense>
  );
}
