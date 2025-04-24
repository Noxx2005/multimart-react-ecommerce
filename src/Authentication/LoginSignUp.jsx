import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';

const AuthPage = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '' });

  useEffect(() => {
    const login = () => {
      document.getElementById("login").style.left = "4px";
      document.getElementById("register").style.right = "-520px";
      document.getElementById("loginBtn").classList.add("white-btn");
      document.getElementById("registerBtn").classList.remove("white-btn");
    };

    const register = () => {
      document.getElementById("login").style.left = "-510px";
      document.getElementById("register").style.right = "5px";
      document.getElementById("registerBtn").classList.add("white-btn");
      document.getElementById("loginBtn").classList.remove("white-btn");
    };

    window.login = login;
    window.register = register;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5081/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      sessionStorage.setItem('token', data.token.token);
      sessionStorage.setItem('email', data.token.email);
      sessionStorage.setItem('isVendor', data.token.isVendor);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...registerForm, isVendor: false };

      const response = await fetch('http://localhost:5081/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Registration failed');
      alert('Registered successfully! Now login.');
      window.login();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="wrapper">
      <nav className="nav">
        <div className="nav-button">
          <button className="btn white-btn" id="loginBtn" onClick={() => window.login()}>Sign In</button>
          <button className="btn" id="registerBtn" onClick={() => window.register()}>Sign Up</button>
        </div>
      </nav>

      <div className="form-box">
        {/* Login Form */}
        <form className="login-container" id="login" onSubmit={handleLogin}>
          <div className="top">
            <span>Don't have an account? <a href="#" onClick={() => window.register()}>Sign Up</a></span>
            <header>Login</header>
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
            <i className="bx bx-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="input-box">
            <input type="submit" className="submit" value="Sign In" />
          </div>
        </form>

        {/* Registration Form */}
        <form className="register-container" id="register" onSubmit={handleRegister}>
          <div className="top">
            <span>Have an account? <a href="#" onClick={() => window.login()}>Login</a></span>
            <header>Sign Up</header>
          </div>
          <div className="input-box">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              required
            />
            <i className="bx bx-lock-alt"></i>
          </div>
          <div className="input-box">
            <input type="submit" className="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
