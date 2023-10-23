import { useEffect, useState } from "react";
import { WishCard } from "../wishCard/wishCard";
import { WishDetailsProps } from "../../../wishDetails/wishDetails";

export const WishsCollection = ({
  handleWishClick,
}: {
  handleWishClick: (wish: any) => void; //Fix type
}) => {
  const [wishs, setWishs] = useState<(WishDetailsProps & { id: string })[]>([]);

  useEffect(() => {
    const fetchWishs = async () => {
      try {
        const sessionToken = sessionStorage.getItem("sessionToken");
        const response = await fetch("/api/wishs?status=Open", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        const data = await response.json();
        setWishs(data);
      } catch (error) {
        console.error("Error fetching wishs:", error);
      }
    };

    fetchWishs();
  }, []);

  return (
    <>
      <h1>בקשות מהשטח</h1>
      <div className="wish-grid">
        {Array.isArray(wishs) &&
          wishs.map((wish, index) => (
            <WishCard
              key={index}
              {...wish}
              onClick={() => handleWishClick(wish)}
            />
          ))}
      </div>
    </>
  );
};
