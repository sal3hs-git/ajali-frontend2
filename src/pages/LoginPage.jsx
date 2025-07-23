import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h2 style={styles.logo}>Ajali</h2>
        </header>
        <form style={styles.form}>
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.register}>
          Don’t have an account? <Link to="/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#FEE2E2',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '16px',
    width: '320px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
  },
  logo: {
    color: '#B91C1C',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    border: '2px solid #DC2626',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  button: {
    padding: '12px',
    backgroundColor: '#DC2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  register: {
    marginTop: '-100px',
    fontSize: '0.9rem',
    position:'relative'
  
  },
  link: {
    color: '#B91C1C',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
