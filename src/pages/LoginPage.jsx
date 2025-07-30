import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

// Build correct URL based on isRegistering
const url = isRegistering
  ? "http://127.0.0.1:5000/auth/register"
  : "http://127.0.0.1:5000/auth/login";

const body = isRegistering
  ? {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }
  : {
      email: formData.email,
      password: formData.password,
    };

if (isRegistering && formData.password !== formData.confirmPassword) {
  setError("Passwords do not match.");
  setLoading(false);
  return;
}
fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})
  .then((res) => {
    if (!res.ok) throw new Error("Login/Register failed");
    return res.json();
  })
  .then((data) => {
    const token = data.token || data.access_token;

if (token) {
  localStorage.setItem("token", token);
  navigate("/admin"); 
} else {
  throw new Error("Token not found in response");
}
  })
  .catch((err) => setError(err.message))
  .finally(() => setLoading(false));}

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEE2E2] px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold text-center text-red-600 mb-6">
          {isRegistering ? "Create an Ajali Account" : "Login to Ajali"}
        </h1>

{error && (
  <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
    {error}
  </div>
)}

<form onSubmit={handleSubmit} className="space-y-4">
  {isRegistering && (
    <input
      type="text"
      name="username"
      placeholder="Full Name"
      value={formData.username}
      onChange={handleChange}
      className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      required
    />
  )}

  <input
    type="email"
    name="email"
    placeholder="Email Address"
    value={formData.email}
    onChange={handleChange}
    className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
    required
  />

  <input
    type="password"
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
    className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
    required
  />

  {isRegistering && (
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
      required
    />
  )}

  <button
    type="submit"
    disabled={loading}
    className={`w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {loading
      ? isRegistering
        ? "Signing Up..."
        : "Logging In..."
      : isRegistering
      ? "Sign Up"
      : "Login"}
  </button>
</form>

<div className="mt-4 text-center text-sm text-gray-600">
  {isRegistering ? (
    <>
      Already have an account?{" "}
      <button
        onClick={() => setIsRegistering(false)}
        className="text-red-600 hover:underline font-medium"
      >
        Login here
      </button>
    </>
  ) : (
    <>
      New to Ajali?{" "}
      <button
        onClick={() => setIsRegistering(true)}
        className="text-red-600 hover:underline font-medium"
      >
        Create account
      </button>
    </>
  )}
</div>

<div className="mt-6 text-center">
  <button
    onClick={() => navigate("/register")}
    className="text-blue-600 underline text-sm hover:text-blue-800"
  >
    Continue without an account →
  </button>
</div>
  </div>
</div>
  );
}

