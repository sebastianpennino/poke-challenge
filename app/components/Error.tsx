// Display that nice Error picture
export const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="relative h-full flex items-center justify-center bg-red-400">
      <img
        src="/assets/images/error.jpg"
        alt="Something went wrong"
        width="500"
      />
      <p className="absolute text-center text-white bg-black bg-opacity-50 p-4 rounded">
        {message || "Something went wrong!"}
      </p>
    </div>
  );
};
