import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  WishDetails,
  WishDetailsProps,
} from "../../wish/wishDetails/wishDetails";

import { User, UserContext } from "../../../../app/userContext/userContext";

import "./unitWishDetails.css";

export const UnitWishDetails = ({
  wishDetails,
}: {
  wishDetails: WishDetailsProps;
}) => {
  const navigate = useNavigate(); // Access navigate
  const { setUser, user } = useContext(UserContext);

  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [showDonePopup, setShowDonePopup] = useState(false);

  const handleCancel = async () => {
    if (!wishDetails) {
      return;
    }

    // Call your backend endpoint here
    try {
      const response = await fetch(`/api/wishs/${wishDetails.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
        },
      });

      if (response.ok) {
        //BAD PRACTICE. We should have a single souce of truth for the user, but since this is a 204 - no content response we can't get it from the backend.
        //We could possibly fecth the user again.
        setUser({ ...user } as User);

        // Navigate after user data has been updated
        navigate("/");
      } else {
        // Handle the case where the wish deletion failed
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error deleting the wish", error);
    }
  };

  const handleDone = async () => {
    if (!wishDetails) {
      return;
    }

    // Call your backend endpoint here
    try {
      const response = await fetch(`/api/wishs/${wishDetails.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Closed" }),
      });

      if (response.ok) {
        // Update the user data
        const newUser = await response.json();
        setUser(newUser);

        // Navigate after user data has been updated
        navigate("/");
      } else {
        // Handle the case where the wish to change the status failed
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error updating wish status", error);
    }
  };

  return (
    <div className="unit-wish-details">
      <WishDetails {...wishDetails} />

      <span>
        {!wishDetails.maker && !wishDetails.deliverer ? (
          <button onClick={() => setShowCancelPopup(true)}>בטל</button>
        ) : wishDetails.status === "Active" ? (
          <button onClick={() => setShowDonePopup(true)}>התקבל</button>
        ) : null}
      </span>

      {/* Cancel Popup */}
      {showCancelPopup && (
        <div
          className="popup-overlay"
          onClick={() => setShowCancelPopup(false)}
        >
          <div className="popup-content">
            <div
              className="close-button"
              onClick={() => setShowCancelPopup(false)}
            >
              X
            </div>
            <p>?לבטל את הבקשה</p>
            <button onClick={handleCancel}>כן</button>
          </div>
        </div>
      )}

      {/* Done Popup */}
      {showDonePopup && (
        <div className="popup-overlay" onClick={() => setShowDonePopup(false)}>
          <div className="popup-content">
            <div
              className="close-button"
              onClick={() => setShowDonePopup(false)}
            >
              X
            </div>
            <p>?בתיאבון! לסגור בקשה</p>
            <button onClick={handleDone}>כן</button>
          </div>
        </div>
      )}
    </div>
  );
};
