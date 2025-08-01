import { useNavigate } from "react-router-dom";

const OptionButton = ({ texto, navigateTo, state }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo, { state });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full cursor-pointer max-w-[500px] h-[500px] bg-[#4C5C92] font-sans hover:bg-[#3F4A7A] transition-colors duration-300 text-white text-3xl font-bold rounded-lg p-4"
    >
      {texto}
    </button>
  );
};

export default OptionButton;
