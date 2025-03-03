import { Image, Text } from "react-native";
import images from "../constants/images";
import { cn } from "../utils/cn";

const LogoSmallPink = ({ classname }: { classname: string }) => {
  return (
    <Image
      source={images.logoSmallPink}
      className={cn(classname)}
      resizeMode="contain"
    />
  );
};

export { LogoSmallPink };
