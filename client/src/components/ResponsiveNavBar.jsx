import React from "react";
import { Link } from "react-router-dom";

const ResponsiveNavBar = () => {
  return (
    <div className="container d-flex flex-wrap">
      <ul className="nav me-auto">
        <li className="nav-item">
          <Link
            href="/"
            className="nav-link link-dark px-2 active bx bxl-shopify nav-link link-dark px-2 active"
          >
            Shopify
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" className="nav-link link-dark px-2">
            Features
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" className="nav-link link-dark px-2">
            Pricing
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" className="nav-link link-dark px-2">
            FAQs
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" className="nav-link link-dark px-2">
            About
          </Link>
        </li>
      </ul>
      <ul className="nav">
        <li className="nav-item">
          <Link href="/" className="nav-link link-dark px-2">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" className="nav-link link-dark px-2">
            Sign up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ResponsiveNavBar;
