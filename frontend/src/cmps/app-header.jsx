import { NavLink } from "react-router-dom";

export function AppHeader() {
  return (
    <header className="main-layout full">
      <section className="flex">
        <div className="logo">Toytopia</div>
        <nav>
          <NavLink to="/">Home</NavLink> | <NavLink to="/toys">Toys</NavLink> |
          <NavLink to="/dashboard">Dashboard</NavLink> | 
          <NavLink to="/about">About</NavLink>
        </nav>

        <NavLink to="/login">
          <button className="login-btn"> Login</button>
        </NavLink>
      </section>
    </header>
  );
}
