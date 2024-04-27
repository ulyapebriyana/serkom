import React, { ReactNode } from "react";
import Footer from "../footer/page";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default layout;
