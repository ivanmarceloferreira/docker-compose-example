import { ReactElement } from "react";

const PagheHeader = ({
  title,
  id,
  unsaved,
  actionButton,
  icon,
}: {
  title: string;
  id?: string | number;
  actionButton?: ReactElement;
  icon?: ReactElement;
  unsaved?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white py-4 px-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex justify-start gap-2 items-center text-teal-900">
            <div className="border rounded-full p-2">{icon}</div>
            <div>
              <h1 className="text-xl font-semibold ">{title}</h1>
              <span>{id ? `ID: ${id}` : undefined}</span>
            </div>
          </div>
          {actionButton}
        </div>
      </div>
      {unsaved && (
        <div className="bg-red-700 text-sm text-white font-semibold p-1 rounded-b-md w-44 self-end">
          {" "}
          Modificações não salvas
        </div>
      )}
    </div>
  );
};

export default PagheHeader;
