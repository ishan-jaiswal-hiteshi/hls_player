import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HlsPlayerProps from "../props/player_Props";

const FormPage: React.FC = () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/audio-player", { state: formData });
  };

  return (
    <div className="flex justify-center  items-center h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4 sm:px-6 sm:py-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4 sm:text-xl">
          HLS Audio Player
        </h2>
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

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <input
            className="block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            Only M3U8 file(s) allowed (MAX. 800x400px).
          </p>
        </div>

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
