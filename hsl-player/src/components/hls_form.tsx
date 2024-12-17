import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HlsPlayerProps from "../props/player_Props";

const FormPage: React.FC = () => {
  const [fileType, setFileType] = useState("link");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<HlsPlayerProps>({
    sourceUrl: "",
    name: "",
    artist: "",
    albumName: "",
    description: "",
    poster: "",
    autoplay: false,
    loop: false,
    muted: false,
    preload: "auto",
  });

  //Form input handle
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //upload file handle
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.type !== "application/vnd.apple.mpegurl" &&
        !file.name.endsWith(".m3u8")
      ) {
        alert("Only M3U8 files are allowed!");
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({
        ...prev,
        sourceUrl: URL.createObjectURL(file),
      }));
      console.log(formData.sourceUrl);
    }
  };

  //input type URL || File upload
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileType(e.target.value);
    if (e.target.value === "link") {
      setFormData((prev) => ({ ...prev, sourceUrl: "" }));
    }
  };
  //Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileType === "file" && !formData.sourceUrl) {
      alert("Please upload a valid M3U8 file.");
      return;
    }
    navigate("/audio-player", { state: formData });
  };

  return (
    <div className="flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4 sm:px-6 sm:py-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4 sm:text-xl">
          HLS Audio Player
        </h2>

        <div>
          <label className="block text-sm font-medium">Song Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Artist</label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Album Name</label>
          <input
            type="text"
            name="albumName"
            value={formData.albumName}
            onChange={handleChange}
            className="w-full p-2 border rounded sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Poster URL</label>
          <input
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            className="w-full p-2 border rounded sm:text-sm"
          />
        </div>

        <div className="flex justify-center items-center space-x-4">
          <div>
            <input
              type="radio"
              id="link"
              name="fileType"
              value="link"
              checked={fileType === "link"}
              onChange={onInputChange}
              className="mr-2"
            />
            <label htmlFor="link">Link of file</label>
          </div>
          <div>
            <input
              type="radio"
              id="file"
              name="fileType"
              value="file"
              checked={fileType === "file"}
              onChange={onInputChange}
              className="mr-2"
            />
            <label htmlFor="file">Upload file</label>
          </div>
        </div>

        {fileType === "link" ? (
          <div>
            <label className="block text-sm font-medium">Source URL</label>
            <input
              type="text"
              name="sourceUrl"
              value={formData.sourceUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded sm:text-sm"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  Only M3U8 files are allowed
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".m3u8"
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 sm:text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
