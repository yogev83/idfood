import { useEffect, useState } from "react";
import { RequestCard } from "../requestCard/requestCard";
import { RequestDetailsProps } from "../../../requestDetails/requestDetails";

export const RequestsCollection = ({
  handleRequestClick,
}: {
  handleRequestClick: (request: any) => void; //Fix type
}) => {
  const [requests, setRequests] = useState<
    (RequestDetailsProps & { id: string })[]
  >([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const sessionToken = sessionStorage.getItem("sessionToken");
        const response = await fetch("/api/requests?status=Open", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <h1>בקשות מהשטח</h1>
      <div className="request-grid">
        {Array.isArray(requests) &&
          requests.map((request, index) => (
            <RequestCard
              key={index}
              {...request}
              onClick={() => handleRequestClick(request)}
            />
          ))}
      </div>
    </>
  );
};
