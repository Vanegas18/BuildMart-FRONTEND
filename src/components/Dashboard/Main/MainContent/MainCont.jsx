import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MainCont = ({ tittle, icon: Icon, quantity, info}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{tittle}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{quantity}</div>
        <p className="text-xs text-green-500 flex items-center">
          <span className="i-lucide-arrow-up mr-1"></span>
          {info}
        </p>
      </CardContent>
    </Card>
  );
};
