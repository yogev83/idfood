import { useContext } from "react";
import {
  RequestDetails,
  RequestDetailsProps,
} from "../../../requestDetails/requestDetails";
import { UserContext } from "../../../../app/userContext/userContext";
import { useNavigate } from "react-router-dom";

export const VolunteerRequestDetails = ({
  requestDetails,
}: {
  requestDetails: RequestDetailsProps;
}) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Access navigate

  const handleRequest = async (key: string) => {
    try {
      if (!user) {
        throw new Error("User is invalid");
      }

      const sessionToken = sessionStorage.getItem("sessionToken");
      const response = await fetch(`/api/requests/${requestDetails.id}`, {
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
          `Error ${key === "maker" ? "making" : "delivering"} request`
        );
      }
      navigate("/");
    } catch (error) {
      console.error(
        `Error ${key === "maker" ? "making" : "delivering"} request:`,
        error
      );
    }
  };

  if (!requestDetails) {
    throw new Error("Request is required");
  }

  const { status, maker, deliverer } = requestDetails;

  return (
    <>
      <RequestDetails {...requestDetails} />
      {status === "Open" && (!maker || !deliverer) && (
        <>
          {!maker && (
            <button onClick={() => handleRequest("maker")}>אני במטבח!</button>
          )}
          {!deliverer && (
            <button onClick={() => handleRequest("deliverer")}>אני אקח!</button>
          )}
        </>
      )}
    </>
  );
};
