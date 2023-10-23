import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
//import { checkUser } from "../../app/checkUser";
import { Login } from "../pages/login/login";
import { Unit } from "../pages/unit/unit";
import { Volunteer } from "../pages/volunteer/volunteer";
//import { NewWish } from "../pages/unit/newWish/newWish";

export const Nav = () => {
  //const navigate = useNavigate();

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
      <Route path="/" element={<Login />} />
      <Route path="/unit" element={<Unit />} />
      <Route path="/volunteer" element={<Volunteer />} />
    </Routes>
  );
};
