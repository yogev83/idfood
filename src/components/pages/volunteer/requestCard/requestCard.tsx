import "./requestCard.css"; // Import your CSS file

export const RequestCard = ({
  id,
  dish,
  unitName,
  location,
  imageURL,
  onClick,
}: {
  id: string;
  dish: string;
  unitName: string;
  location: string;
  imageURL?: string; // Make imageURL optional
  onClick: (id: string) => void;
}) => {
  return (
    <div className="request-card" onClick={() => onClick(id)} dir="rtl">
      {imageURL && <img src={imageURL} alt={dish} />}{" "}
      {/* Check if imageURL exists before rendering img */}
      <h2>{dish}</h2>
      <p>{unitName}</p>
      <p>{location}</p>
    </div>
  );
};
