import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
  const { register, handleSubmit } = useForm();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Ajali</h1>
        <form onSubmit={handleSubmit(onLogin)} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
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
    minHeight: '100vh',
    backgroundColor: '#FEE2E2', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFF1F1', 
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '320px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    color: '#B91C1C', 
    fontSize: '2rem',
    fontWeight: '700',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    border: '2px solid #DC2626', 
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#DC2626',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  register: {
    marginTop: '20px',
    color: '#7F1D1D',
    fontSize: '0.95rem',
  },
  link: {
    color: '#B91C1C',
    textDecoration: 'none',
    fontWeight: '600',
  }
};
