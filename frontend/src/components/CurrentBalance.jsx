import { BsBank } from "react-icons/bs";

function CurrentBalance({ balance }) {
  return (
    <div className="p-4 shadow-custom-shadow rounded-sm flex gap-6 items-center">
      <div className="rounded-full p-4 border w-16 h-16 flex items-center justify-center">
        <BsBank className="text-3xl text-purple-800" />
      </div>
      <div>
        <h2 className="text-gray-500 font-medium">Aktueller Kontostand</h2>
        <h3 className="font-medium text-2xl">{balance} €</h3>
      </div>
    </div>
  );
}

export default CurrentBalance;
