import "./wishDetails.css"; // Import your CSS filewish

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
      <p>מי מבקש: {unitName}</p>
      {maker && <p>מי מכין: {maker}</p>}
      {deliverer && <p>מי לוקח: {deliverer}</p>}
      <p>המנה: {dish}</p>
      <p>מספר חיילים: {numSoldiers}</p>
      <p>מיקום: {location}</p>
      {specialWishs && <p>בקשות מיוחדות: {specialWishs}</p>}
      {about && <p>פרטים נוספים: {about}</p>}
      {imageURL && <img src={imageURL} alt="Preview" />}
    </div>
  );
};
