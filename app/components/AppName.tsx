import { Text } from "react-native";
import cn from "@/utils/cn";

const AppName = ({ classname: classNamee }: { classname: string }) => {
  return <Text className={cn(classNamee)}>CHERRYPICK</Text>;
};

export default AppName;
