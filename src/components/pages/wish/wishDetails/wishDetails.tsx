import {
  Badge,
  Body1,
  Subtitle2,
  Title2,
  Title3,
} from "@fluentui/react-components";
import "./wishDetails.css"; // Import your CSS file

export interface WishDetailsProps {
  id: string;
  status: "Open" | "Active" | "Closed";
  unitName: string;
  maker?: string;
  deliverer?: string;
  dish: string;
  numSoldiers: number;
  location: string;
  specialRequests?: string;
  about?: string;
  imageURL?: string;
}

export const WishDetails = (wishDetails: WishDetailsProps) => {
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
    <div className="wish-details" dir="rtl">
      <Title2>פרטי הבקשה</Title2>
      <br />
      <Badge
        className="status-badge"
        size="small"
        color={!maker || !deliverer ? "warning" : "brand"}
      >
        {!maker || !deliverer ? "בקשה בהמתנה למתנדבים" : "בקשה בטיפול"}
      </Badge>
      <br />
      <Body1>המנה: {dish}</Body1>
      <br />
      <Body1>מספר חיילים: {numSoldiers}</Body1>
      <br />
      <Body1>מיקום: {location}</Body1>
      <br />
      {specialRequests && (
        <>
          <Body1>בקשות מיוחדות: {specialRequests}</Body1>
          <br />
        </>
      )}
      {about && (
        <>
          <Body1>פרטים נוספים: {about}</Body1>
          <br />
        </>
      )}
      {<img src={imageURL || "/avatar.jpeg"} alt="Preview" />}
    </div>
  );
};
