import { useState, useEffect, ComponentType } from "react";
import { useParams } from "react-router-dom";
import { WishDetailsProps } from "./wishDetails/wishDetails";

export const withWishDetails = (
  Component: ComponentType<{ wishDetails: WishDetailsProps }>
) => {
  return () => {
    const [wishDetails, setWishDetails] = useState<WishDetailsProps | null>(
      null
    );
    const { id } = useParams(); // Get the wish id from the URL

    useEffect(() => {
      // Fetch the wish details by id when the component mounts
      fetch(`/api/wishs/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setWishDetails(data))
        .catch((error) => console.error(error));
    }, [id]); // Add id as a dependency to refetch when it changes

    if (!wishDetails) {
      return <div>Loading...</div>; // Show loading state while fetching wish details
    }

    return <Component wishDetails={wishDetails} />;
  };
};
