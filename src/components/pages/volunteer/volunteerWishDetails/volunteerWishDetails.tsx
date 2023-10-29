import { useContext } from "react";
import {
  WishDetails,
  WishDetailsProps,
} from "../../wish/wishDetails/wishDetails";
import { UserContext } from "../../../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";

import "./volunteerWishDetails.css";
import { Button, Caption1Strong } from "@fluentui/react-components";
import { CheckmarkCircle24Regular } from "@fluentui/react-icons";

export const VolunteerWishDetails = ({
  wishDetails,
}: {
  wishDetails: WishDetailsProps;
}) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Access navigate

  const handleWish = async (key: string) => {
    try {
      if (!user) {
        throw new Error("User is invalid");
      }

      const sessionToken = sessionStorage.getItem("sessionToken");
      const response = await fetch(`/api/wishs/${wishDetails.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [key]: user.id,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Error ${key === "maker" ? "making" : "delivering"} wish`
        );
      }
      navigate("/");
    } catch (error) {
      console.error(
        `Error ${key === "maker" ? "making" : "delivering"} wish:`,
        error
      );
    }
  };

  if (!wishDetails) {
    throw new Error("Wish is required");
  }

  const { status, maker, deliverer } = wishDetails;

  console.log(status, maker, deliverer);

  return (
    <div className="volunteer-wish-details" dir="rtl">
      <WishDetails wishDetails={wishDetails}>
        {status === "Open" && (
          <>
            {!maker && (
              <Button
                appearance="primary"
                className="done-button"
                icon={<CheckmarkCircle24Regular />}
                onClick={() => handleWish("maker")}
              >
                <Caption1Strong className="action-caption">
                  אני במטבח
                </Caption1Strong>
              </Button>
            )}
            {!deliverer && (
              <Button
                appearance="primary"
                className="cancel-button"
                icon={<CheckmarkCircle24Regular />}
                onClick={() => handleWish("deliverer")}
              >
                <Caption1Strong className="action-caption">
                  אני אקח
                </Caption1Strong>
              </Button>
            )}
          </>
        )}
      </WishDetails>
    </div>
  );
};
