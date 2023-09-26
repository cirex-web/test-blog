import { StaticImageData } from "next/image";
import ericPic from "../../public/pic copy.png";
interface Image {
  date: string
}
export const images: Image[] = [{
  date: "Saturday, September 16, 2023 10:23 AM"
}, {
  date: "9/25/2023 3:45 PM"
}, {
  date: "Sep 24, 2023 8:03 PM"
}, {
  date: "Sep 24, 2023 4:21 PM"
}].sort((a, b) => +new Date(a.date) - + new Date(b.date));
export function getImageName(date: string) {
  return "/" + date.replaceAll(":", "") + ".png";
}