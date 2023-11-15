import { useContext, useEffect, useMemo, useState } from "react";
import { WishDetailsProps } from "../../wish/wishDetails/wishDetails";
import { UserContext } from "../../../../app/userContext/userContext";
import { WishCard } from "../../../wishCard/wishCard";

import { Button, Tab, TabList } from "@fluentui/react-components";

import "./unitDashboard.css";

export const UnitDashboard = ({
  handleWishClick,
  handleNewWishClick,
}: {
  handleWishClick: (wish: WishDetailsProps) => void;
  handleNewWishClick: () => void;
}) => {
  const [wishs, setWishs] = useState<WishDetailsProps[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>("pending");

  const { user } = useContext(UserContext);

  const sessionToken = sessionStorage.getItem("sessionToken");

  const closedWishExists = wishs.some((wish) => wish.status === "Closed");

  const filteredWishs = useMemo(() => {
    return wishs.filter((wish) =>
      activeTab === "history"
        ? wish.status === "Closed"
        : wish.status === "Open" || wish.status === "Active"
    );
  }, [activeTab, wishs]);

  useEffect(() => {
    if (!user) {
      return;
    }

    // Fetch all wishes linked with this user
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

  return (
    <div className="unit-dashboard">
      <TabList
        selectedValue={activeTab}
        onTabSelect={(e) => {
          setActiveTab((e.currentTarget as HTMLInputElement).value);
        }}
      >
        <Tab value="pending">בקשות פעילות</Tab>
        <Tab value="history" disabled={!closedWishExists}>
          בקשות סגורות
        </Tab>
      </TabList>
      {filteredWishs.length > 0 ? (
        <span className="wish-cards">
          {filteredWishs.map((wish) => (
            <WishCard
              key={wish.id}
              id={wish.id}
              dish={wish.dish}
              unitname={wish.unitname}
              location={wish.location}
              imageURL={wish.imageURL}
              onClick={() => handleWishClick(wish)}
            />
          ))}
        </span>
      ) : (
        <Button
          appearance="primary"
          className="new-wish-button"
          onClick={handleNewWishClick}
        >
          בקשה חדשה
        </Button>
      )}
    </div>
  );
};
