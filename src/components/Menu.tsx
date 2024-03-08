import { Box, IconButton, PresenceTransition, Spacer } from "native-base";
import React, { useState } from "react";
import { Image } from "react-native";
import List from "phosphor-react-native/src/icons/List";
import X from "phosphor-react-native/src/icons/X";
import House from "phosphor-react-native/src/icons/House";
import WarningCircle from "phosphor-react-native/src/icons/WarningCircle";
import Title from "./Title";
import MenuItem from "./MenuItem";
import { ICategoryModel } from "../models/category";
import getIconByName from "../utils/get-icon-by-name";
import { EIcon } from "../enums/icon";
import { EScreenName } from "../enums/navigation";

export default function Menu() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [categories, setCategories] = useState<ICategoryModel[]>([
    {
      id: 1,
      iconName: EIcon.building,
      isFavorite: true,
      title: "Tarefas de casa",
    },
    {
      id: 2,
      iconName: EIcon.hamburguer,
      isFavorite: false,
      title: "Tarefas do trabalho",
    },
  ]);

  const callBackClickMenuItem = () => {
    setIsOpenMenu(false);
  };

  return (
    <Box
      safeArea
      zIndex={"20"}
      w={isOpenMenu ? "full" : "0"}
      h={"full"}
      position={"absolute"}
    >
      {!isOpenMenu && (
        <>
          <Image
            source={require("../../assets/blob-menu.png")}
            style={{
              width: 200,
              height: 200,
              position: "absolute",
              top: -40,
              left: -120,
            }}
          />

          <Box zIndex={21} mt={"4"} position={"absolute"} left={0} top={28}>
            <IconButton
              icon={<List size={40} color="white" weight="bold" />}
              onPress={() => setIsOpenMenu(true)}
            />
          </Box>
        </>
      )}

      <PresenceTransition
        visible={isOpenMenu}
        initial={{
          opacity: 0,
          translateX: -20,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
          transition: {
            duration: 150,
          },
        }}
        style={{
          width: isOpenMenu ? "100%" : 0,
        }}
      >
        <Box bg={"#8A3FFC"} w={"full"} h={"full"} position={"relative"}>
          <Box position={"absolute"} right={0} bottom={0}>
            <Image
              source={require("../../assets/blob-menu-white.png")}
              style={{
                width: 130,
                height: 130,
              }}
            />

            <IconButton
              icon={<X size={40} color="#8A3FFC" weight="bold" />}
              onPress={() => setIsOpenMenu(false)}
              zIndex={21}
              position={"absolute"}
              right={0}
              bottom={0}
            />
          </Box>

          <Box p={"4"}>
            <Box>
              <Title textColor="white">Afazeres</Title>

              <Spacer h={"1"} />

              <MenuItem
                Icon={House}
                goTo={EScreenName.HOME}
                callBack={callBackClickMenuItem}
              >
                Início
              </MenuItem>

              <MenuItem
                Icon={WarningCircle}
                goTo={EScreenName.IMPORTANT}
                callBack={callBackClickMenuItem}
              >
                Importantes
              </MenuItem>
            </Box>

            <Spacer h={"12"} />

            {categories.length > 0 && (
              <Box>
                <Title textColor="white">Categorias</Title>

                <Spacer h={"1"} />

                {categories.map((categoryItem) => (
                  <MenuItem
                    key={categoryItem.id}
                    id={categoryItem.id.toString()}
                    Icon={getIconByName(categoryItem.iconName)!}
                    goTo={EScreenName.TODO}
                    isFavorite={categoryItem.isFavorite}
                    callBack={callBackClickMenuItem}
                  >
                    {categoryItem.title}
                  </MenuItem>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </PresenceTransition>
    </Box>
  );
}