import "./requestDetails.css"; // Import your CSS file

export interface RequestDetailsProps {
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

export const RequestDetails = (requestDetails: RequestDetailsProps) => {
  const {
    status,
    unitName,
    maker,
    deliverer,
    dish,
    numSoldiers,
    location,
    specialRequests,
    about,
    imageURL,
  }: RequestDetailsProps = requestDetails;

  if (!requestDetails) {
    return <div>Loading...</div>; // Show loading state while fetching request details
  }

  return (
    <div className="request-details">
      <h1>פרטי הבקשה</h1>
      <p>סטטוס: {status}</p>
      <p>מי מבקש: {unitName}</p>
      {maker && <p>מי מכין: {maker}</p>}
      {deliverer && <p>מי לוקח: {deliverer}</p>}
      <p>המנה: {dish}</p>
      <p>מספר חיילים: {numSoldiers}</p>
      <p>מיקום: {location}</p>
      {specialRequests && <p>בקשות מיוחדות: {specialRequests}</p>}
      {about && <p>פרטים נוספים: {about}</p>}
      {imageURL && <img src={imageURL} alt="Preview" />}
    </div>
  );
};
