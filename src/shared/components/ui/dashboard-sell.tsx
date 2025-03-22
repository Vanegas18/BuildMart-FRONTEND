import React from "react";
interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex-1 overflow-auto p-6" {...props}>
      {children}
    </div>
  );
}
