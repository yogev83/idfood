import { useContext, useEffect, useState } from "react";
import { WishsCollection } from "./wishsCollection/wishsCollection";
import { VolunteerWishDetails } from "./volunteerWishDetails/volunteerWishDetails";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../app/userContext/userContext";
import { VolunteerDashboard } from "./volunteerDashboard/volunteerDahsboard";

export const Volunteer = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Access navigate

  const [handledWish, setHandledWish] = useState(null);
  const [showWishsCollection, setShowWishsCollection] = useState(false);

  const handleWishClick = (wish: any) => {
    setHandledWish(wish);
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
      {handledWish ? (
        <VolunteerWishDetails wishDetails={handledWish} />
      ) : showWishsCollection ? (
        <WishsCollection handleWishClick={handleWishClick} />
      ) : (
        <VolunteerDashboard showOpenWishs={handleShowOpenWishs} />
      )}
    </div>
  );
};
