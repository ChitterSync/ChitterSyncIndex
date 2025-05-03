import { useState } from 'react'
const SignIn = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password }),
      });

      if (response.ok) {
        alert("Login successful!");
        window.location.href = "/home.html";
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Invalid Login ID or Password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <h1>Sign In</h1>
      <form id="signin-form" className="signup" onSubmit={handleSubmit} noValidate>
        {errorMessage && <div className="form__message form__message--error">{errorMessage}</div>}
        
        <label htmlFor="login-id">Login ID</label>
        <input
          type="text"
          id="login-id"
          name="Login ID"
          placeholder="Login ID"
          required
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="Password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading} className={loading ? 'loading' : ''}>
          Login
        </button>
        <p>
          Don't have an account? <a href="register.html">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;