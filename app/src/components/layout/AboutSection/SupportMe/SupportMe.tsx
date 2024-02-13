import React from "react";
import MyButton from "../../../global/Button";
import { FaHeart } from "react-icons/fa";
import { electron } from "../../../../constant/contextBridge";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import LOCALES from "../../../../locales";
import useAppLanguage from "../../../../redux/appLanguage/useAppLanguage";

export default function SupportMe() {
  const { appLanguage } = useAppLanguage();

  const handleOpenDonation = () => {
    electron.openLink("https://www.buymeacoffee.com/dalufish");
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <MyButton>
          <FaHeart color="pink" />
        </MyButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 600 }}>
        <AlertDialog.Title>{LOCALES[appLanguage].SupportMe}</AlertDialog.Title>
        <AlertDialog.Description>
          <div className="flex flex-col gap-2">
            <div>{LOCALES[appLanguage].SupportMeDesc}</div>
            <div className="flex items-center justify-center mt-8 mb-4">
              <div onClick={handleOpenDonation} className="select-none">
                <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Dalufish&button_colour=FFDD00&font_colour=000000&font_family=Comic&outline_colour=000000&coffee_colour=ffffff" />
              </div>
            </div>
          </div>
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              {LOCALES[appLanguage].Cancel}
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
