import { Button } from "@/shared/components/ui";
import { CardFooter } from "@/shared/components/ui/card";

export const CardFooterAccess = ({ info }) => {
  return (
    <CardFooter className="flex flex-col">
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">{info}</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full">
          <img
            src="https://w7.pngwing.com/pngs/712/520/png-transparent-google-mail-gmail-logo-icon-thumbnail.png"
            alt="Google"
            width={24}
            height={24}
            className="mr-2 h-4 w-4"
          />
          Google
        </Button>
        <Button variant="outline" className="w-full">
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
            alt="Facebook"
            width={24}
            height={24}
            className="mr-2 h-4 w-4"
          />
          Facebook
        </Button>
      </div>
    </CardFooter>
  );
};
