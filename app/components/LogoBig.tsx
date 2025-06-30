import { Image } from "react-native";
import images from "@/constants/images";
import { cn } from "@/app/utils/cn";

const LogoBig = ({ classname: classname }: { classname: string }) => {
  return (
    <Image
      source={images.logoBig}
      className={cn(classname)}
      resizeMode="contain"
    />
  );
};

export { LogoBig };
