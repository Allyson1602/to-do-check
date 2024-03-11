import { render, screen } from "@testing-library/react-native";
import MenuItem from "../../components/MenuItem";
import House from "phosphor-react-native/src/icons/House";
import { EScreenName } from "../../enums/navigation";
import { describe, expect, test } from "@jest/globals";

describe("Test for Menu Item Component", () => {
  test("should render a heart icon", () => {
    const isfavorite = true;
    render(
      <MenuItem
        isfavorite={isfavorite}
        Icon={House}
        id={"999"}
        goTo={EScreenName.HOME}
      >
        Início
      </MenuItem>
    );

    const iconHeart = screen.getByTestId("icon-heart");
    expect(iconHeart).toBeInTheDocument();
  });
});
