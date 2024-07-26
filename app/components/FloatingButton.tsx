// TODO: Update this with proper types
const FloatingButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-4
        right-4
        lg:right-8
        bg-blue-500
        text-white
        rounded-full
        w-16
        h-16
        flex
        items-center
        justify-center
        shadow-lg
        hover:bg-blue-600
        focus:outline-none
        focus:ring-2
        focus:ring-blue-300
        focus:ring-opacity-50
        transition
        transform
        hover:scale-110
      "
      aria-label="Add new card"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};

export default FloatingButton;
