import {
  Badge,
  Body1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Title3,
} from "@fluentui/react-components";
import "./wishDetails.css"; // Import your CSS file
import { ReactNode } from "react";

export interface WishDetailsProps {
  id: string;
  status: "Open" | "Active" | "Closed";
  unitname: string;
  maker?: string;
  deliverer?: string;
  dish: string;
  numSoldiers: number;
  location: string;
  specialRequests?: string;
  about?: string;
  imageURL?: string;
  thankyouMessage?: string;
  thankyouImageURL?: string;
}

export const WishDetails = ({
  wishDetails,
  children,
}: {
  wishDetails: WishDetailsProps;
  children?: ReactNode;
}) => {
  const {
    maker,
    deliverer,
    dish,
    numSoldiers,
    location,
    specialRequests,
    about,
    imageURL,
  }: WishDetailsProps = wishDetails;

  return (
    <Card className="wish-details" dir="rtl">
      <CardHeader
        header={
          <span className="wish-details-card-header">
            <Title3>{dish}</Title3>
            <Badge
              className="status-badge"
              size="small"
              color={!maker || !deliverer ? "warning" : "brand"}
            >
              {!maker || !deliverer ? "בהמתנה למתנדבים" : "בטיפול"}
            </Badge>
          </span>
        }
        description={
          <Body1>
            <p>
              <b>מספר חיילים: </b>
              {numSoldiers}
            </p>
            <p>
              <b>מיקום: </b>
              {location}
            </p>
            {specialRequests && (
              <>
                <p>
                  <b>בקשות מיוחדות: </b>
                  {specialRequests}
                </p>
              </>
            )}
            {about && (
              <>
                <p>
                  <b>פרטים נוספים: </b>
                  {about}
                </p>
              </>
            )}
          </Body1>
        }
      />
      <CardPreview>
        {<img src={imageURL || "/avatar.jpeg"} alt="Preview" />}
      </CardPreview>
      {children ? <CardFooter>{children}</CardFooter> : null}
    </Card>
  );
};
