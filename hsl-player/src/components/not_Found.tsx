import { useNavigate } from "react-router-dom";

const Not_Found = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen gap-2">
      <p className="text-red-500">Page not found. Please return to the form.</p>
      <button
        onClick={() => {
          navigate("/", { replace: true, state: null });
          localStorage.setItem("formSubmitted", "false");
        }}
      >
        Go to Form
      </button>
    </div>
  );
};

export default Not_Found;
