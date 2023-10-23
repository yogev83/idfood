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
      <span className="logo-wrapper">
        <h4>?מי פנוי לג'חנון</h4>
        <img
          src="/idfood.jpeg"
          alt="IDFood Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
      </span>
      {user?.username && <h2>!{user.username} שלום</h2>}
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
