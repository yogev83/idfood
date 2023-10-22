import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";

import "./header.css";
import { Menu } from "./menu/menu";

export const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(document.createElement("div"));

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMenuClick = (event: React.MouseEvent) => {
    setIsMenuOpen(!isMenuOpen);
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Check if menuRef.current is defined
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen, menuRef]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <button className="menu-button" onClick={handleMenuClick}>
        ☰
      </button>
      <h1>IDFood</h1>
      {user?.username && <p>Welcome, {user.username}!</p>}
      <button className="close-button" onClick={() => navigate("/")}>
        X
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="menu-wrapper"
          style={{ top: cursorPosition.y, left: cursorPosition.x }}
        >
          <Menu closeMenu={closeMenu} /> {/* Pass closeMenu to Menu */}
        </div>
      )}
    </header>
  );
};
