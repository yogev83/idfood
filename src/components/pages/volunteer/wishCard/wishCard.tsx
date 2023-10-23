import "./wishCard.css"; // Import your CSS file

export const WishCard = ({
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
    <div className="wish-card" onClick={() => onClick(id)} dir="rtl">
      {<img src={imageURL || "avatar.jpeg"} alt={dish} />}
      <h2>{dish}</h2>
      <p>{unitName}</p>
      <p>{location}</p>
    </div>
  );
};
