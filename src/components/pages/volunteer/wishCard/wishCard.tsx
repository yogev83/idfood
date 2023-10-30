import {
  Body1,
  Body1Strong,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Subtitle1,
} from "@fluentui/react-components";
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
    <Card className="wish-card" onClick={() => onClick(id)} dir="rtl">
      <CardHeader
        className="wish-card-header"
        header={<Subtitle1>{dish}</Subtitle1>}
        description={
          <Caption1>
            <Body1Strong>{unitName}</Body1Strong>
            <Body1 className="wish-card-location">{location}</Body1>
          </Caption1>
        }
      />
      <CardPreview className="wish-card-preview">
        <img src={imageURL || "/avatar.jpeg"} alt={dish} />
      </CardPreview>
    </Card>
  );
};
