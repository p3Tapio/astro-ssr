import { useStore } from '@nanostores/react';
import { authStore } from 'state/auth';
import './Navigation.scss';

interface NavigationProps {
  currentPage: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const authState = useStore(authStore);
  const isAuthenticated = authState?.isLoggedIn || false;

  return (
    <nav className="nav">
      <div className="nav__list">
        <div className={`nav__item ${currentPage === '/' ? 'active' : ''}`}>
          <a href="/">Home</a>
        </div>
        {isAuthenticated ? (
          <>
            <div
              className={`nav__item ${currentPage === '/user' ? 'active' : ''}`}
            >
              <a href="/user">Userpage</a>
            </div>
            <div
              className={`nav__item ${currentPage === '/logout' ? 'active' : ''}`}
            >
              {/* TODO: Implement logout */}
              <a href="/user">Logout</a>
            </div>
          </>
        ) : (
          <>
            <div
              className={`nav__item ${currentPage === '/auth?type=register' ? 'active' : ''}`}
            >
              <a href="/auth?type=register">Register</a>
            </div>
            <div
              className={`nav__item ${currentPage === '/auth?type=login' ? 'active' : ''}`}
            >
              <a href="/auth?type=login">Sign in</a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
