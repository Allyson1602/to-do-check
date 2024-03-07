import React from "react";
import { Text, Box, HStack, Divider } from "native-base";

export interface IHeaderTitleProps {
  text: string;
}

export default function HeaderTitle({ text }: IHeaderTitleProps) {
  return (
    <Text py={"4"} fontSize={"xl"} color={"#8A3FFC"} fontWeight={"medium"}>
      {text}
    </Text>
  );
}
