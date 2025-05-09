export const PermisosCheckbox = ({ id, label, description }) => {
  return (
    <div className="flex items-start space-x-3 mt-1">
      <div className="space-y-1 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};
