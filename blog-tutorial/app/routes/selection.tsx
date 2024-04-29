import MenuBar from "./MenuBar";

import { useUser } from "~/utils";

const SelectionPage = () => {
  const user = useUser();

  return (
    <div>
      <MenuBar user={user} pageTitle="Pick your round" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 1
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 2
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 3
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-4 rounded">
            Day 4
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
