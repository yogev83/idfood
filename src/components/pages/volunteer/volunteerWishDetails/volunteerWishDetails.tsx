import { useContext } from "react";
import {
  WishDetails,
  WishDetailsProps,
} from "../../wish/wishDetails/wishDetails";
import { UserContext } from "../../../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";

import "./volunteerWishDetails.css";

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

  return (
    <div className="volunteer-wish-details">
      <WishDetails {...wishDetails} />
      {status === "Open" && (!maker || !deliverer) && (
        <span>
          {!maker && (
            <button onClick={() => handleWish("maker")}>אני במטבח!</button>
          )}
          {!deliverer && (
            <button onClick={() => handleWish("deliverer")}>אני אקח!</button>
          )}
        </span>
      )}
    </div>
  );
};
