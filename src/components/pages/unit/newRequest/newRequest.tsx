import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { UserContext } from "../../../../app/userContext/userContext";

import "./newRequest.css"; // Import your CSS file

export const NewRequest = () => {
  const [dish, setDish] = useState("");
  const [numSoldiers, setNumSoldiers] = useState("1");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [specialRequests, setSpecialRequests] = useState("");
  const [kosherOnly, setKosherOnly] = useState(false); // Add this line

  const navigate = useNavigate(); // Access navigate

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Create a new JavaScript object
    const newRequest = {
      dish,
      numSoldiers,
      location,
      about,
      image,
      specialRequests,
      kosherOnly,
    };

    // Get the session token of the currently logged-in user
    const sessionToken = sessionStorage.getItem("sessionToken");

    // Make a POST request to your API
    const response = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`, // Include the session token in the headers
      },
      body: JSON.stringify(newRequest),
    });

    if (!response.ok) {
      console.error("Failed to submit request");
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
    <div className="new-request-form">
      <h1>בקשה חדשה</h1>
      <form onSubmit={handleSubmit}>
        <label>
          מנה:
          <input
            type="text"
            placeholder="מה בא לכם לאכול?"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
          />
        </label>
        <label>
          מספר החיילים:
          <select
            value={numSoldiers}
            onChange={(e) => setNumSoldiers(e.target.value)}
          >
            {Array.from(Array(10).keys()).map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label>
          מיקום:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          {" "}
          {/* Add this block */}
          מטבח כשר בלבד:
          <input
            type="checkbox"
            checked={kosherOnly}
            onChange={(e) => setKosherOnly(e.target.checked)}
          />
        </label>
        <label>
          בקשות מיוחדות:
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="זה המקום לכתוב אם אתה רגישים לגלוטן, צמחוניים, לא מסוגלים להתמודד עם חריף, וכו'"
          />
        </label>
        <label>
          קצת עליכם:
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
        </label>
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
