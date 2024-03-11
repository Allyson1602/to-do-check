import React from "react";
import { HStack, Text, Box } from "native-base";
import { TIcon } from "../types/icon";
import Heart from "phosphor-react-native/src/icons/Heart";
import { EScreenName } from "../enums/navigation";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

export interface IMenuItemProps {
  isfavorite?: boolean;
  id: string;
  Icon: TIcon;
  goTo: EScreenName;
  children: React.ReactNode;
  callBack?: () => void;
}

export default function MenuItem({
  isfavorite = false,
  id,
  Icon,
  goTo,
  callBack,
  children,
}: IMenuItemProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleClickItem = () => {
    navigation.navigate({ name: goTo, key: id });
    callBack?.();
  };

  return (
    <Box px={"1"} py={"1"} mb={"1"}>
      <Pressable onPress={handleClickItem}>
        <HStack w={"full"} justifyContent={"space-between"}>
          <HStack space={"2"}>
            <Icon color="#FFF" size={26} />
            <Text color="#FFF" fontSize={"md"} alignSelf={"flex-end"}>
              {children}
            </Text>
          </HStack>

          {isfavorite ? (
            <Heart weight="duotone" color="#FFF" data-testid="icon-heart" />
          ) : undefined}
        </HStack>
      </Pressable>
    </Box>
  );
}
