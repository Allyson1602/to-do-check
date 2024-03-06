import React from "react";
import { Link, HStack, Text } from "native-base";
import { TIcon } from "../types/icon";
import Heart from "phosphor-react-native/src/icons/Heart";

export interface IMenuItemProps {
  link: string;
  isFavorite?: boolean;
  Icon: TIcon;
  children: React.ReactNode;
}

export default function MenuItem({
  isFavorite = false,
  link,
  Icon,
  children,
}: IMenuItemProps) {
  return (
    <Link href={link} py={"1"}>
      <HStack w={"full"} justifyContent={"space-between"}>
        <HStack space={"2"}>
          <Icon color="#FFF" size={26} />
          <Text color="#FFF" fontSize={"md"}>
            {children}
          </Text>
        </HStack>

        {isFavorite && <Heart weight="duotone" color="#FFF" />}
      </HStack>
    </Link>
  );
}
