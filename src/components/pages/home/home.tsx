import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../app/userContext/userContext";
import {
  Body1Stronger,
  Button,
  Caption1,
  Subtitle2Stronger,
} from "@fluentui/react-components";

import { WishsCollection } from "../../wishsCollection/wishsCollection";
import { loginWithToken } from "./loginService";

import { LoginDialogWithExternalTrigger } from "./loginDialog/loginDialogWithExternalTrigger";
import { LoginDialogWithTriggerButton } from "./loginDialog/loginDialogWithTriggerButton";

import "./home.css";

export const Home = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [target, setTarget] = useState("");
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
          <Body1Stronger> התחברו בתור</Body1Stronger>
          <LoginDialogWithTriggerButton loginType={"volunteer"}>
            <Button>אזרחים מתנדבים</Button>
          </LoginDialogWithTriggerButton>
          <LoginDialogWithTriggerButton loginType={"unit"}>
            <Button>חיילים רעבים</Button>
          </LoginDialogWithTriggerButton>
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
            handleWishClick={(wish) => {
              setTarget(wish.id);
              setIsOpen(true);
            }}
          />
          <LoginDialogWithExternalTrigger
            loginType={"volunteer"}
            isOpen={isOpen}
            target={target}
          />
        </div>
      </div>
    </>
  );
};
