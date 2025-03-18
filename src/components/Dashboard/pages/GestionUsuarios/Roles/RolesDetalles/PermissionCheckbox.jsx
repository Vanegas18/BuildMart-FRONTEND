import { Checkbox } from "@/components/ui/checkbox";

const PermissionCheckbox = ({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}) => {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
      />
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

export default PermissionCheckbox;
