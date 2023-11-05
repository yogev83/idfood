import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
//import { checkUser } from "../../app/checkUser";
import { Unit } from "../pages/unit/unit";
import { Volunteer } from "../pages/volunteer/volunteer";
import { withWishDetails } from "../pages/wish/withWishDetails";
import { VolunteerWishDetails } from "../pages/volunteer/volunteerWishDetails/volunteerWishDetails";
import { UnitWishDetails } from "../pages/unit/unitWishDetails/unitWishDetails";
import { WishThanksyou } from "../pages/unit/wishThankyou/wishThankyou";
import { CompletedWish } from "../pages/wish/completedWish/completedWish";
import { Home } from "../pages/home/home";
//import { NewWish } from "../pages/unit/newWish/newWish";

export const Nav = () => {
  //const navigate = useNavigate();

  const VolunteerWishDetailsHOC = () => withWishDetails(VolunteerWishDetails)();
  const UnitWishDetailsHOC = () => withWishDetails(UnitWishDetails)();

  useEffect(() => {
    // const user = checkUser(); // Replace this with your actual check user logic
    // if (!user) {
    //   navigate("/login");
    // } else if (user.type === "unit") {
    //   navigate("/unit");
    // } else if (user.type === "volunteer") {
    //   navigate("/volunteer");
    // }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/unit" element={<Unit />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/wish/:id" element={<CompletedWish />} />
      <Route path="/volunteer/wish/:id" element={<VolunteerWishDetailsHOC />} />
      <Route path="/unit/wish/:id" element={<UnitWishDetailsHOC />} />
      <Route path="/unit/wish/:id/thankyou" element={<WishThanksyou />} />
    </Routes>
  );
};
