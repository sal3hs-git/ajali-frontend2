import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="auth-page">
      <header>
        <h2>Ajali</h2>
        <Link to="/">Login</Link>
      </header>
      <h3>Ajali! Login</h3>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}
