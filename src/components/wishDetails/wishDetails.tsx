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
  specialWishs?: string;
  about?: string;
  imageURL?: string;
}

export const WishDetails = (wishDetails: WishDetailsProps) => {
  const {
    status,
    unitName,
    maker,
    deliverer,
    dish,
    numSoldiers,
    location,
    specialWishs,
    about,
    imageURL,
  }: WishDetailsProps = wishDetails;

  if (!wishDetails) {
    return <div>Loading...</div>; // Show loading state while fetching wish details
  }

  return (
    <div className="wish-details">
      <h1>פרטי הבקשה</h1>
      <p>סטטוס: {status}</p>
      {(!maker || !deliverer) && <p>בקשה בהמתנה למתנדבים</p>}
      <p>המנה: {dish}</p>
      <p>מספר חיילים: {numSoldiers}</p>
      <p>מיקום: {location}</p>
      {specialWishs && <p>בקשות מיוחדות: {specialWishs}</p>}
      {about && <p>פרטים נוספים: {about}</p>}
      {
        <img
          src={imageURL || "avatar.jpeg"}
          alt="Preview"
          style={{ width: "100%" }}
        />
      }
    </div>
  );
};
