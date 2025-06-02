export const PermisosCheckbox = ({ id, label, description }) => {
  return (
    <div className="flex items-start space-x-3 mt-1 p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow">
      <div className="space-y-1 leading-none flex-1 min-w-0">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block">
          {label}
        </label>
        <p className="text-xs sm:text-sm text-gray-500 break-words">
          {description}
        </p>
      </div>
    </div>
  );
};
