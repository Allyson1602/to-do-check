import React, { useState } from "react";
import Building from "phosphor-react-native/src/icons/Buildings";
import House from "phosphor-react-native/src/icons/HouseLine";
import Tree from "phosphor-react-native/src/icons/Tree";
import Sun from "phosphor-react-native/src/icons/Sun";
import Hamburger from "phosphor-react-native/src/icons/Hamburger";
import PawPrint from "phosphor-react-native/src/icons/PawPrint";
import ShoppingCart from "phosphor-react-native/src/icons/ShoppingCart";
import { TIcon } from "../types/icon";
import { EIcon } from "../enums/icon";

export interface ITitleProps {
  size?: "small" | "medium";
  iconId?: number;
  children: React.ReactNode;
}

export default function getIconByName(name: EIcon): TIcon {
  switch (name) {
    case EIcon.building:
      return Building;
    case EIcon.house:
      return House;
    case EIcon.tree:
      return Tree;
    case EIcon.sun:
      return Sun;
    case EIcon.hamburguer:
      return Hamburger;
    case EIcon.paw:
      return PawPrint;
    case EIcon.shoppingCart:
      return ShoppingCart;
  }
}
