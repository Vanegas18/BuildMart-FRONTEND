import React from "react";
import { Button } from "./components/ui/button";

export const App = () => {
  return (
    <div>
      <h1 className="text-2xl text-center">BUILD MART</h1>
      <Button variant="destructive" className="m-5">
        Hola
      </Button>
    </div>
  );
};
