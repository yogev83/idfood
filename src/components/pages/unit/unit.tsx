import { useContext, useEffect, useState } from "react";
import { NewWish } from "./newWish/newWish";
import { UserContext } from "../../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";

import { UnitDashboard } from "./unitDashboard/unitDashboard";
import { WishDetailsProps } from "../wish/wishDetails/wishDetails";

import "./unit.css";

export const Unit = () => {
  const { user } = useContext(UserContext);
  const [showNewWish, setShowNewWish] = useState(false);

  const navigate = useNavigate(); // Access navigate

  const handleWishClick = (wish: any) => {
    navigate(`/unit/wish/${wish.id}`);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="unit-page" dir="rtl">
      {showNewWish ? (
        <NewWish />
      ) : (
        <UnitDashboard
          handleWishClick={handleWishClick}
          handleNewWishClick={() => setShowNewWish(true)}
        />
      )}
    </div>
  );
};
