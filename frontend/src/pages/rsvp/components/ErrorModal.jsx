import { AlertIcon } from "@/components/atoms/Icons";

export const ErrorModal = ({ errorMessage, onClick }) => {
  return (
    <div className="w-8/10 flex flex-col items-center justify-center bg-white gap-6 p-2 rounded-md">
      <AlertIcon className="size-15 text-terracota" />
      <div className="rounded-md">
        <p className="text-grafite font-bold text-center text-lg">
          {errorMessage}
        </p>
      </div>
      <button
        onClick={onClick}
        className="h-10 w-30 bg-terracota text-white py-2 rounded text-lg"
      >
        OK
      </button>
    </div>
  );
};
