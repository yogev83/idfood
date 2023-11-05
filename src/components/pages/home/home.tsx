import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../app/userContext/userContext";
import {
  Caption1,
  Caption1Strong,
  Subtitle2Stronger,
} from "@fluentui/react-components";

import { WishsCollection } from "../../wishsCollection/wishsCollection";
import { LoginDialog } from "./loginDialog/loginDialog";
import { loginWithToken } from "./loginService";

import "./home.css";

export const Home = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("loginToken");
    if (token) {
      // If token exists, get user data and navigate to appropriate page
      const fetchUserData = async () => {
        const userData = await loginWithToken(token);
        setUser(userData);
        navigate(userData.type);
      };

      fetchUserData();
    }
  }, [navigate, setUser]);

  return (
    <>
      <div className="home-page" dir="rtl">
        <div className="login-strip">
          <Caption1Strong> התחברו בתור</Caption1Strong>
          <LoginDialog loginType={"volunteer"}></LoginDialog>
          <LoginDialog loginType={"unit"}></LoginDialog>
        </div>
        <div className="background-image">
          <img src="home.jpeg" alt="Background" /> {/* Add your image here */}
        </div>
        <div className="about-idfood">
          <img src="idfood.png" alt="logo" />
          <span className="about-idfood-body">
            <Subtitle2Stronger>
              מה זה בעצם <b>IDFood?</b>
            </Subtitle2Stronger>
            <br />
            <Caption1>
              <i>IDFood</i> זו פלטפורמה שמחברת בין החיילים בשטח והאזרחים בבית.
              חיילים מפרסמים מה בא להם לאכול - אזרחים מתנדבים להכין להם. פשוט,
              לא?
            </Caption1>
          </span>
        </div>
        <div className="collection-container">
          <WishsCollection
            handleWishClick={() => {
              setIsOpen(true);
            }}
          />
          <LoginDialog loginType={"volunteer"} isOpen={isOpen}></LoginDialog>
        </div>
      </div>
    </>
  );
};
