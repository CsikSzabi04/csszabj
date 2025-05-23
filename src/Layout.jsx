import { Outlet, useLocation } from 'react-router-dom';
import "./Portfolio.css";
import LuInterface from './components/LuInterface';

export default function Layout() {
  const location = useLocation();

  // Check if the current path is exactly "/portfolio"
  const showLuInterface = location.pathname == '/';

  return (
    <div>
      <Outlet />
      {showLuInterface && <LuInterface />}
    </div>
  );
}
