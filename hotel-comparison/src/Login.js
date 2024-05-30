// src/Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === 'admin@iol.world' && password === 'password123') {
      onLogin(true);
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="home-edge-b2b-login">
      <video autoPlay muted loop className="background-video">
        <source src="https://www.iol.world/iol-edge/b2b/assets/vid/b2bvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="home-edge-b2b-login-inner">
        <div className="home-edge-b2b-login-header">
          <div className="home-edge-b2b-login-header-banner">
            <img src="https://www.iol.world/iol-edge/product/b2b/assets/images/iol-x-reverse.svg" alt="iOL X B2B" />
            <span>Rate Comparison</span>
          </div>
        </div>
        <div className="home-edge-b2b-login-inner-widget">
          <div className="signup_login_modal_login_block">
            <div className="default_modal_header">
              <div className="default_modal_header_left">
                <h2>Log in</h2>
              </div>
            </div>
            <form className="default_modal_content_inner" onSubmit={handleLogin}>
              <div className="default_modal_content_body">
                <div className="default_modal_content_body_input_group default_modal_content_body_input1">
                  <label className="signup_login_form_label signup_login_form_label_email" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    className="signup_login_form_label_input signup_login_form_input_email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="default_modal_content_body_input_group default_modal_content_body_input2">
                  <label className="signup_login_form_label" htmlFor="password">Password</label>
                  <div className="password-input__wrapper">
                    <input
                      id="password"
                      name="password"
                      className="signup_login_form_label_input signup_login_form_input_password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="show_user_password show_user_password--center hide_user_password"></i>
                  </div>
                </div>
              </div>
              <div className="default_modal_content_footer">
                <button className="butn butn_with_loader undefined" type="submit">
                  <span>Continue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="home-edge-b2b-login-footer">
          <div className="home-edge-b2b-login-footer-banner">
            <span>Powered  <span>&hearts;</span> by <a href="https://www.iol.world/" target="_blank" rel="noopener noreferrer">iOL Edge</a>&trade;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
