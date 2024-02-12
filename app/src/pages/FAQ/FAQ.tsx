import { Blockquote, Link } from "@radix-ui/themes";
import React from "react";
import { useHistory } from "react-router-dom";
import FAQItem from "./FAQItem/FAQItem";
import LOCALES from "../../locales";
import useAppLanguage from "../../redux/appLanguage/useAppLanguage";

export default function FAQ() {
  const history = useHistory();
  const { appLanguage } = useAppLanguage();

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll relative">
      <Link
        style={{ color: "white" }}
        onClick={() => {
          history.goBack();
        }}
      >
        {LOCALES[appLanguage].GoBack}
      </Link>
      <div className="my-2 flex flex-col gap-4">
        <FAQItem
          q={LOCALES[appLanguage].FAQ1Q}
          a={LOCALES[appLanguage].FAQ1A}
        />
        <FAQItem
          q={LOCALES[appLanguage].FAQ2Q}
          a={LOCALES[appLanguage].FAQ2A}
        />
        <FAQItem
          q={LOCALES[appLanguage].FAQ3Q}
          a={LOCALES[appLanguage].FAQ3A}
        />
        <FAQItem
          q={LOCALES[appLanguage].FAQ4Q}
          a={LOCALES[appLanguage].FAQ4A}
        />
        <FAQItem
          q={LOCALES[appLanguage].FAQ5Q}
          a={LOCALES[appLanguage].FAQ5A}
        />
      </div>
    </div>
  );
}
