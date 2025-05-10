import { Image } from "react-native";
import images from "../constants/images";
import { cn } from "../utils/cn";

const LogoCircle = ({ classname }: { classname: string }) => {
  return (
    <Image
      source={images.logoCircle}
      className={cn(classname)}
      resizeMode="contain"
    />
  );
};

export { LogoCircle };
