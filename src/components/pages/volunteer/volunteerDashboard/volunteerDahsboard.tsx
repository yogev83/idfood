import { useContext, useEffect, useState } from "react";
import { RequestCard } from "../requestCard/requestCard";
import { RequestDetailsProps } from "../../../requestDetails/requestDetails";
import { UserContext } from "../../../../app/userContext/userContext";

import "./volunteerDashboard.css";

export const VolunteerDashboard = ({
  showOpenRequests,
}: {
  showOpenRequests: () => void;
}) => {
  const [requests, setRequests] = useState<RequestDetailsProps[]>([]);
  const [activeTab, setActiveTab] = useState("toMake");
  const { user } = useContext(UserContext);

  const sessionToken = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    if (!user) {
      return;
    }

    // Fetch all requests linked with this user
    fetch(`/api/requests?user=${user.id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error:", error));
  }, [sessionToken, user]);

  if (!user) {
    return null;
  }

  const filteredRequests = requests.filter((request) =>
    activeTab === "toMake"
      ? request.maker === user.id
      : request.deliverer === user.id
  );

  return (
    <div className="volunteer-dashboard">
      <div>
        <button onClick={() => setActiveTab("toMake")}>להכנה</button>
        <button onClick={() => setActiveTab("toDeliver")}>למשלוח</button>
      </div>
      {filteredRequests.length > 0 ? (
        filteredRequests.map((request) => (
          <div key={request.id}>
            <RequestCard
              id={request.id}
              dish={request.dish}
              unitName={request.unitName}
              location={request.location}
              imageURL={request.imageURL}
              onClick={() => console.log("Clicked!")}
            />
          </div>
        ))
      ) : (
        <div>
          <p>אין לכם בקשות בהמתנה</p>
        </div>
      )}
      <button onClick={showOpenRequests}>בקשות מהשטח</button>
    </div>
  );
};
