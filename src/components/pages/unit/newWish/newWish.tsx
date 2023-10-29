import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { UserContext } from "../../../../app/userContext/userContext";
import {
  Checkbox,
  Field,
  Input,
  Select,
  Textarea,
  Title2,
} from "@fluentui/react-components";

import "./newWish.css"; // Import your CSS file

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

  const navigate = useNavigate(); // Access navigate

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="new-wish" dir="rtl">
      <Title2 className="new-wish-title">בקשה חדשה</Title2>
      <form onSubmit={handleSubmit} className="new-wish-form">
        <Field label="מה בא לכם לאכול?">
          <Input
            type="text"
            placeholder="שם המנה"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
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
        <Field label="איפה אתם?">
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {LOCATIONS.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="מטבח כשר בלבד?">
          <Checkbox
            checked={kosherOnly}
            onChange={(e) => setKosherOnly(e.target.checked)}
          ></Checkbox>
        </Field>
        <Field label="בקשות מיוחדת?">
          <Textarea
            placeholder="זה המקום לכתוב אם אתה רגישים לגלוטן, צמחוניים, לא מסוגלים להתמודד עם חריף, וכו'"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />
        </Field>
        {/* <label>
          בקשות מיוחדות:
          <textarea
            value={specialWishs}
            onChange={(e) => setSpecialWishs(e.target.value)}
            placeholder="זה המקום לכתוב אם אתה רגישים לגלוטן, צמחוניים, לא מסוגלים להתמודד עם חריף, וכו'"
          />
        </label> */}
        <label>
          תמונה:
          <input type="file" onChange={handleImageUpload} />
          {image && <img src={image} alt="Preview" />}
        </label>
        <input type="submit" value="שלח" />
      </form>
    </div>
  );
};
