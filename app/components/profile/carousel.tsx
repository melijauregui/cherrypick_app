import { FlatList } from "react-native-gesture-handler";
import { ItemData } from "./bottomSheets";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity, Text } from "react-native";

function CarouselWithFlatList({
  data,
  itemsSelected,
  setItemsSelected,
}: {
  data: ItemData[];
  itemsSelected: string[];
  setItemsSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.title}
      renderItem={({ item, index }) =>
        renderItem({
          item,
          index,
          itemsSelected,
          setItemsSelected,
        })
      }
      style={{ backgroundColor: "white" }}
    />
  );
}

export default CarouselWithFlatList;

const renderItem = ({
  item,
  itemsSelected,
  setItemsSelected,
}: {
  item: ItemData;
  index: number;
  itemsSelected: string[];
  setItemsSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const isSelected = itemsSelected.includes(item.title);
  const { width, height } = Dimensions.get("window");

  function handleOnpress(title: string) {
    const updated = itemsSelected.includes(title)
      ? itemsSelected.filter(item => item !== title)
      : [...itemsSelected, title];
    setItemsSelected(updated);
  }

  return (
    <TouchableOpacity
      onPress={() => handleOnpress(item.title)}
      className="aspect-[0.9] px-1 pt-2 pb-1 flex flex-col items-center"
      style={{ width: width * 0.45 }}
    >
      {item.image ? (
        <Image
          source={item.image}
          className={`
              w-full
              h-[85%]
              rounded-2xl
              ${isSelected ? "" : "opacity-50"}
            `}
          resizeMode="cover"
        />
      ) : null}
      <Text
        className={`mt-1 font-pregular ${
          isSelected ? " text-black" : " text-gray-500"
        }`}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};
