import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate from react-router-dom
import {
  Button,
  Card,
  CardFooter,
  CardPreview,
  Field,
  Image,
  Textarea,
} from "@fluentui/react-components";

import "./wishThankyou.css"; // Import your CSS file

export const WishThanksyou = () => {
  const { id } = useParams(); // Get the wish id from the URL

  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const navigate = useNavigate(); // Access navigate

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!message && !image) {
      alert("או מילות תודה, או תמונה בבקשה");
      return;
    }

    // Make a PUT request to your API
    const response = await fetch(`/api/wishs/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        thankyouMessage: message,
        thankyouImageURL: image,
      }),
    });

    if (!response.ok) {
      console.error("Failed to submit thank you");
      return;
    }

    navigate(`/wish/${id}`);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="wish-thankyou" dir="rtl">
      <Card>
        <CardPreview className="wish-thankyou-preview">
          <form onSubmit={handleSubmit} className="wish-thankyou-form">
            <Field label="מילת תודה למתנדבים המהממים שלנו">
              <Textarea
                className="thankyou-textarea"
                size="large"
                resize="vertical"
                placeholder="תודה רבה על האוכל, היה מדהים!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Field>
            <Field
              label="תמונה"
              hint="של האוכל, שלכם עם האוכל, של מכתב תודה, או של פינגווין. פינגווין זה תמיד טוב"
            >
              <input
                type="file"
                id="imageUpload"
                hidden
                onChange={handleImageUpload}
              />
              <Button
                onClick={() => {
                  const fileInput = document.getElementById("imageUpload");
                  if (fileInput) {
                    fileInput.click();
                  }
                }}
              >
                Upload Image
              </Button>
              <div className="thankyou-image-container">
                {image && <Image fit="contain" src={image} alt="Preview" />}
              </div>
            </Field>
          </form>
        </CardPreview>
        <CardFooter>
          <Button
            className="submit-button"
            appearance="primary"
            onClick={handleSubmit}
          >
            שלח
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
