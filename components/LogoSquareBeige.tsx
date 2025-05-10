import { Image } from "react-native";
import images from "../constants/images";
import { cn } from "../utils/cn";

const LogoSquareBeige = ({ classname }: { classname: string }) => {
  return (
    <Image
      source={images.logoSquareBeige}
      className={cn(classname)}
      resizeMode="contain"
    />
  );
};

export { LogoSquareBeige };
