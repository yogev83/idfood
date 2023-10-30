import {
  Body1,
  Body1Stronger,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Title3,
} from "@fluentui/react-components";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { WishDetailsProps } from "../wishDetails/wishDetails";

import "./completedWish.css";

export const CompletedWish = () => {
  const [wishDetails, setWishDetails] = useState<WishDetailsProps | null>(null);
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

  return (
    <div className="completed-wish">
      <Card className="completed-wish-card" dir="rtl">
        <CardHeader
          header={<Title3>{wishDetails.dish}</Title3>}
          description={<Body1>{wishDetails.thankyouMessage}</Body1>}
        />
        <CardPreview>
          {
            <img
              src={wishDetails.thankyouImageURL || "/avatar.jpeg"}
              alt="Preview"
            />
          }
        </CardPreview>
        <CardFooter>
          <div className="completed-wish-card-sharing">
            <Body1Stronger> עזרו להפיץ את הבשורה ושתפו עם חברים!</Body1Stronger>
            <span className="completed-wish-card-sharing-buttons">
              <FacebookShareButton
                url={window.location.href} // The URL of the page you want to share
                quote={"This is a test"} // The text that will be shared
                hashtag={"text"} // The hashtag that will be shared
              >
                <FacebookIcon />
              </FacebookShareButton>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
