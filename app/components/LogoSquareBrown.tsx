import { Image } from "react-native";
import images from "@/constants/images";
import cn from "@/app/utils/cn";

const LogoSquareBrown = ({ classname }: { classname: string }) => {
  return (
    <Image
      source={images.logoSquareBrown}
      className={cn(classname)}
      resizeMode="contain"
    />
  );
};

export default LogoSquareBrown;
