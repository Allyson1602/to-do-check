import React from "react";
import { Text, Box, HStack, Divider } from "native-base";
import getIconByName from "../utils/get-icon-by-name";
import { EIcon } from "../enums/icon";

export interface ITitleProps {
  textColor?: string;
  size?: "small" | "medium";
  iconname?: EIcon;
  children: React.ReactNode;
}

export default function Title(props: ITitleProps) {
  const size = props.size || "small";
  const Icon = props.iconname ? getIconByName(props.iconname) : undefined;

  return (
    <Box py={"1"}>
      <HStack space={"2"}>
        {Icon && <Icon color={props.textColor ?? "#8A3FFC"} size={20} />}
        <Text
          fontSize={size === "small" ? "sm" : "md"}
          fontWeight={"semibold"}
          color={props.textColor ?? "#8A3FFC"}
        >
          {props.children}
        </Text>
      </HStack>
      <Divider bg={props.textColor ?? "#8A3FFC80"} />
    </Box>
  );
}
