import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

function Header() {
  const [visible, setVisible] = useState(false);

  return (
    <header className={styles.header}>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link to={'/'} className="navbar-brand">
          JSONPlaceholder
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setVisible(!visible)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${visible && 'show'} collapse navbar-collapse`}
          id="navbarsExampleDefault"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link
                to={'/posts'}
                className="nav-link"
                onClick={() => setVisible(false)}
              >
                Posts <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={'/albums'}
                className="nav-link"
                onClick={() => setVisible(false)}
              >
                Álbuns
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={'/todos'}
                className="nav-link"
                onClick={() => setVisible(false)}
              >
                To Do
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
