import { useContext, useEffect, useState } from "react";
import { RequestsCollection } from "./requestsCollection/requestsCollection";
import { VolunteerRequestDetails } from "./volunteerRequestDetails/volunteerRequestDetails";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../app/userContext/userContext";
import { VolunteerDashboard } from "./volunteerDashboard/volunteerDahsboard";

export const Volunteer = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Access navigate

  const [handledRequest, setHandledRequest] = useState(null);
  const [showRequestsCollection, setShowRequestsCollection] = useState(false);

  const handleRequestClick = (request: any) => {
    setHandledRequest(request);
  };

  const handleShowOpenRequests = () => {
    setShowRequestsCollection(true);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="volunteer-page" dir="rtl">
      {handledRequest ? (
        <VolunteerRequestDetails requestDetails={handledRequest} />
      ) : showRequestsCollection ? (
        <RequestsCollection handleRequestClick={handleRequestClick} />
      ) : (
        <VolunteerDashboard showOpenRequests={handleShowOpenRequests} />
      )}
    </div>
  );
};
