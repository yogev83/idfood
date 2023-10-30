import { SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { UserContext } from "../../../../app/userContext/userContext";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Checkbox,
  Field,
  Input,
  Select,
  Textarea,
  Title2,
} from "@fluentui/react-components";

import "./newWish.css"; // Import your CSS file
import { ImageLoader } from "../../../imageLoader/imageLoader";

const LOCATIONS = [
  "הקריות",
  "אזור חיפה",
  "צפון השרון",
  "גוש דן",
  "הגליל המערבי",
  "השפלה",
  "אזור באר-שבע",
  "אזור ירושלים",
  "חבל לכיש",
  "עוטף עזה",
  "אזור אילת",
  "הערבה",
];

export const NewWish = () => {
  const [dish, setDish] = useState("");
  const [numSoldiers, setNumSoldiers] = useState("1");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [specialRequests, setSpecialRequests] = useState("");
  const [kosherOnly, setKosherOnly] = useState(false); // Add this line

  const [shouldShowDishError, setShouldShowDishError] = useState(false);
  const [shouldShowLocationError, setShouldShowLocationError] = useState(false);

  const navigate = useNavigate(); // Access navigate

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!dish) {
      setShouldShowDishError(true);
      alert("נא למלא את כל שדות החובה");
      return;
    }

    if (!location) {
      setShouldShowLocationError(true);
      alert("נא למלא את כל שדות החובה");
      return;
    }

    // Create a new JavaScript object
    const newWish = {
      dish,
      numSoldiers,
      location,
      image,
      specialRequests,
      kosherOnly,
    };

    // Get the session token of the currently logged-in user
    const sessionToken = sessionStorage.getItem("sessionToken");

    // Make a POST request to your API
    const response = await fetch("/api/wishs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`, // Include the session token in the headers
      },
      body: JSON.stringify(newWish),
    });

    if (!response.ok) {
      console.error("Failed to submit wish");
      return;
    }

    const newUser = await response.json();
    setUser(newUser);
    navigate("/unit"); // Navigate back to the Unit page
  };

  return (
    <Card className="new-wish" dir="rtl">
      <CardHeader
        header={<Title2 className="new-wish-title">בקשה חדשה</Title2>}
      />
      <CardPreview className="new-wish-card-preview">
        <form onSubmit={handleSubmit} className="new-wish-form">
          <Field
            label="מה בא לכם לאכול?"
            required
            validationMessage="אם לא תספרו לנו, איך נדע?"
            validationMessageIcon={null}
            validationState={shouldShowDishError && !dish ? "error" : "none"}
          >
            <Input
              required
              type="text"
              placeholder="ג'חנון עם ביצה"
              value={dish}
              onChange={(e) => {
                setDish(e.target.value);
                setShouldShowDishError(true);
              }}
            />
          </Field>
          <Field label="כמה אתם?">
            <Select
              value={numSoldiers}
              onChange={(e) => setNumSoldiers(e.target.value)}
            >
              {Array.from(Array(10).keys()).map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="איפה אתם?"
            required
            defaultValue={"הקריות"}
            validationMessage="אם לא תספרו לנו, איך נדע?"
            validationMessageIcon={null}
            validationState={
              shouldShowLocationError && !dish ? "error" : "none"
            }
          >
            <Select
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShouldShowLocationError(true);
              }}
            >
              {LOCATIONS.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </Select>
          </Field>
          <Checkbox
            className="kosher-checkbox"
            label={"מטבח כשר בלבד?"}
            checked={kosherOnly}
            onChange={() => setKosherOnly(!kosherOnly)}
          />
          <Field
            label="בקשות מיוחדת?"
            hint="זה המקום לכתוב אם אתה רגישים לגלוטן, צמחוניים, לא מסוגלים להתמודד עם חריף, וכו'"
          >
            <Textarea
              placeholder="נשמח להרבה רסק"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </Field>
          <ImageLoader
            onChange={(image: SetStateAction<string | null>) => setImage(image)}
          />
        </form>
      </CardPreview>
      <CardFooter>
        <Button type="button" appearance="primary" onClick={handleSubmit}>
          שלח
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          בטל
        </Button>
      </CardFooter>
    </Card>
  );
};
