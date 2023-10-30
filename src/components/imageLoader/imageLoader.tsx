import { Button, Field, Image } from "@fluentui/react-components";
import { useEffect, useState } from "react";

export const ImageLoader = ({ onChange }: { onChange: any }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    onChange(image);
  }, [image, onChange]);

  return (
    <Field label="תמונה">
      <input type="file" id="imageUpload" hidden onChange={handleImageUpload} />
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
  );
};
