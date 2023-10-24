import { useContext, useEffect, useState } from "react";
import { WishDetailsProps } from "../../wishDetails/wishDetails";
import { NewWish } from "./newWish/newWish";
import { UserContext } from "../../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { UnitWishDetails } from "./unitWishDetails/unitWishDetails";

import "./unit.css"; // Import your CSS file
import { Button, Title2 } from "@fluentui/react-components";

export const Unit = () => {
  const { user } = useContext(UserContext);
  const [showNewWish, setShowNewWish] = useState(false);
  const [activeWish, setActiveWish] = useState<WishDetailsProps | null>(null);

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
        .then((data) => setActiveWish(data));
      setShowNewWish(false);
    } else {
      setActiveWish(null);
    }
  }, [user, user?.activeWish]);

  return (
    <div className="unit-page">
      {showNewWish ? (
        <NewWish />
      ) : activeWish ? (
        <UnitWishDetails wish={activeWish} />
      ) : (
        <span>
          <Title2>אין לכם בקשות פעילות</Title2>
          <Button
            onClick={() => setShowNewWish(true)}
            className="new-wish-button"
          >
            צור בקשה חדשה
          </Button>
        </span>
      )}
    </div>
  );
};
