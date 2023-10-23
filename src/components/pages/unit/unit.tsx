import { useContext, useEffect, useState } from "react";
import { RequestDetailsProps } from "../../requestDetails/requestDetails";
import { NewRequest } from "./newRequest/newRequest";
import { UserContext } from "../../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";
import "./unit.css"; // Import your CSS file
import { UnitRequestDetails } from "./unitRequestDetails/unitRequestDetails";

export const Unit = () => {
  const { user } = useContext(UserContext);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [activeRequest, setActiveRequest] =
    useState<RequestDetailsProps | null>(null);

  const navigate = useNavigate(); // Access navigate

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.activeRequest) {
      fetch(`/api/requests/${user.activeRequest}`)
        .then((response) => response.json())
        .then((data) => setActiveRequest(data));
      setShowNewRequest(false);
    } else {
      setActiveRequest(null);
    }
  }, [user, user?.activeRequest]);

  return (
    <div className="unit-page">
      {showNewRequest ? (
        <NewRequest />
      ) : activeRequest ? (
        <UnitRequestDetails request={activeRequest} />
      ) : (
        <>
          <h2>אין לכם בקשות פעילות</h2>
          <button
            onClick={() => setShowNewRequest(true)}
            className="new-request-button"
          >
            צור בקשה חדשה
          </button>
        </>
      )}
    </div>
  );
};
