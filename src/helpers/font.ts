import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";

export const defineFont = () => {
  const [hasFonts, setHasFonts] = useState(false);

  const fontsAsync = loadAsync({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });

  useEffect(() => {
    fontsAsync.then(() => {
      setHasFonts(true);
    });
  }, []);

  if (hasFonts) {
    return true;
  } else {
    return false;
  }
};
