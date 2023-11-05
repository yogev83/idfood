import { useContext, useEffect, useState } from "react";
import { WishsCollection } from "../../wishsCollection/wishsCollection";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../app/userContext/userContext";
import { VolunteerDashboard } from "./volunteerDashboard/volunteerDahsboard";

import "./volunteer.css";

export const Volunteer = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Access navigate

  const [showWishsCollection, setShowWishsCollection] = useState(false);

  const handleWishClick = (wish: any) => {
    navigate(`/volunteer/wish/${wish.id}`);
  };

  const handleShowOpenWishs = () => {
    setShowWishsCollection(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="volunteer-page" dir="rtl">
      {showWishsCollection ? (
        <WishsCollection handleWishClick={handleWishClick} />
      ) : (
        <VolunteerDashboard
          showOpenWishs={handleShowOpenWishs}
          handleWishClick={handleWishClick}
        />
      )}
    </div>
  );
};
