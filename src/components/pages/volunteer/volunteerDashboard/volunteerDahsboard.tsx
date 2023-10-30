import { useContext, useEffect, useMemo, useState } from "react";
import { WishDetailsProps } from "../../wish/wishDetails/wishDetails";
import { UserContext } from "../../../../app/userContext/userContext";

import { WishCard } from "../wishCard/wishCard";
import { Button, Subtitle1, Tab, TabList } from "@fluentui/react-components";

import "./volunteerDashboard.css";

export const VolunteerDashboard = ({
  showOpenWishs,
  handleWishClick,
}: {
  showOpenWishs: () => void;
  handleWishClick: (wish: WishDetailsProps) => void;
}) => {
  const [wishs, setWishs] = useState<WishDetailsProps[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { user } = useContext(UserContext);

  const sessionToken = sessionStorage.getItem("sessionToken");

  const filteredWishs = useMemo(
    () =>
      wishs.filter((wish) =>
        activeTab === "toMake"
          ? wish.maker === user?.id
          : wish.deliverer === user?.id
      ),
    [activeTab, user?.id, wishs]
  );

  const isMaker = useMemo(
    () => wishs.some((wish) => wish.maker === user?.id),
    [user?.id, wishs]
  );
  const isDeliverer = useMemo(
    () => wishs.some((wish) => wish.deliverer === user?.id),
    [user?.id, wishs]
  );

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

  useEffect(() => {
    if (isMaker) {
      setActiveTab("toMake");
    } else if (isDeliverer) {
      setActiveTab("toDeliverer");
    }
  }, [isDeliverer, isMaker]);

  if (!user) {
    return null;
  }

  return (
    <div className="volunteer-dashboard">
      <TabList
        selectedValue={activeTab}
        onTabSelect={(e) => {
          setActiveTab((e.currentTarget as HTMLInputElement).value);
        }}
      >
        <Tab value="toMake" disabled={!isMaker}>
          להכנה
        </Tab>
        <Tab value="toDeliver" disabled={!isDeliverer}>
          למשלוח
        </Tab>
      </TabList>
      {filteredWishs.length > 0 ? (
        <span className="wish-cards">
          {filteredWishs.map((wish) => (
            <WishCard
              key={wish.id}
              id={wish.id}
              dish={wish.dish}
              unitName={wish.unitName}
              location={wish.location}
              imageURL={wish.imageURL}
              onClick={() => handleWishClick(wish)}
            />
          ))}
        </span>
      ) : (
        <Subtitle1>אין לכם בקשות בהמתנה</Subtitle1>
      )}
      <Button
        appearance="primary"
        className="open-wishs-button"
        onClick={showOpenWishs}
      >
        בקשות מהשטח
      </Button>
    </div>
  );
};
