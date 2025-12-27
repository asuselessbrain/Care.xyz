import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"],
});

export const fontBangla = localFont({
  src: "../fonts/mayaboti-normal.ttf",
});
