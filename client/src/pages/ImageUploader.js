import React, { useState, useEffect } from "react";
import { create } from "ipfs-http-client";

const ipfs = create({ host: "127.0.0.1", port: 5001, protocol: "http" });

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedHash, setUploadedHash] = useState("");

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    console.log('checking!!')
    ipfs.cat("bafybeifeqt7mvxaniphyu2i3qhovjaf3sayooxbh5enfdqtiehxjv2ldte");
  }, []);

  const uploadImage = async () => {
    try {
      const file = await ipfs.add(selectedFile);
      setUploadedHash(file.path);
      console.log(file.path);
    } catch (error) {
      console.error("Error uploading image to IPFS:", error);
    }
  };

  return (
    <div>
      <h1>IPFS Image Uploader</h1>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={uploadImage}>Upload</button>
      {uploadedHash && (
        <div>
          <h2>Uploaded Image Hash:</h2>
          <p>{uploadedHash}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
