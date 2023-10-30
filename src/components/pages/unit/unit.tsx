import { useContext, useEffect, useState } from "react";
import { NewWish } from "./newWish/newWish";
import { UserContext } from "../../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";

import "./unit.css";

export const Unit = () => {
  const { user } = useContext(UserContext);
  const [showNewWish, setShowNewWish] = useState(false);

  const navigate = useNavigate(); // Access navigate

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.activeWish) {
      fetch(`/api/wishs/${user.activeWish}`)
        .then((response) => response.json())
        .then(() => navigate(`/unit/wish/${user.activeWish}`));
      setShowNewWish(false);
    }
  }, [navigate, user, user?.activeWish]);

  return (
    <div className="unit-page">
      {showNewWish ? (
        <NewWish />
      ) : (
        <span className="unit-dashboard">
          <Button
            appearance="primary"
            onClick={() => setShowNewWish(true)}
            className="new-wish-button"
          >
            בקשה חדשה
          </Button>
        </span>
      )}
    </div>
  );
};
