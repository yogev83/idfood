import { useNavigate } from "react-router-dom";
import "./menu.css";

type MenuProps = {
  closeMenu: () => void;
};

export const Menu = ({ closeMenu }: MenuProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`, // Pass the session token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      sessionStorage.removeItem("sessionToken"); // Remove the session token from sessionStorage
      localStorage.removeItem("loginToken"); // Remove the login token
      navigate("/");
      closeMenu(); // Close the menu
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="menu">
      <p onClick={handleLogout} className="menu-item">
        התנתק
      </p>
    </div>
  );
};
