import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to Reelio</h1>
      <p>The simplest way to book cinematographers.</p>
      <Link to="/register"><button>Get Started</button></Link>
    </div>
  );
}
export default Home;\n