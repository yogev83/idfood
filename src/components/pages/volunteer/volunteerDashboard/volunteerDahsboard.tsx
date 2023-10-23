import { useContext, useEffect, useState } from "react";
import { WishDetailsProps } from "../../../wishDetails/wishDetails";
import { UserContext } from "../../../../app/userContext/userContext";

import "./volunteerDashboard.css";
import { WishCard } from "../wishCard/wishCard";

export const VolunteerDashboard = ({
  showOpenWishs,
}: {
  showOpenWishs: () => void;
}) => {
  const [wishs, setWishs] = useState<WishDetailsProps[]>([]);
  const [activeTab, setActiveTab] = useState("toMake");
  const { user } = useContext(UserContext);

  const sessionToken = sessionStorage.getItem("sessionToken");

  useEffect(() => {
    if (!user) {
      return;
    }

    // Fetch all wishs linked with this user
    fetch(`/api/wishs?user=${user.id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setWishs(data))
      .catch((error) => console.error("Error:", error));
  }, [sessionToken, user]);

  if (!user) {
    return null;
  }

  const filteredWishs = wishs.filter((wish) =>
    activeTab === "toMake" ? wish.maker === user.id : wish.deliverer === user.id
  );

  return (
    <div className="volunteer-dashboard">
      <div>
        <button onClick={() => setActiveTab("toMake")}>להכנה</button>
        <button onClick={() => setActiveTab("toDeliver")}>למשלוח</button>
      </div>
      {filteredWishs.length > 0 ? (
        filteredWishs.map((wish) => (
          <div key={wish.id}>
            <WishCard
              id={wish.id}
              dish={wish.dish}
              unitName={wish.unitName}
              location={wish.location}
              imageURL={wish.imageURL}
              onClick={() => console.log("Clicked!")}
            />
          </div>
        ))
      ) : (
        <div>
          <p>אין לכם בקשות בהמתנה</p>
        </div>
      )}
      <button onClick={showOpenWishs}>בקשות מהשטח</button>
    </div>
  );
};
