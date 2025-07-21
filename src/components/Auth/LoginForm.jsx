
import { useForm } from 'react-hook-form';

export default function LoginForm({ onLogin }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <input placeholder="Email" {...register("email")} />
      <input placeholder="Password" type="password" {...register("password")} />
      <button type="submit">Login</button>
    </form>
  );
}
