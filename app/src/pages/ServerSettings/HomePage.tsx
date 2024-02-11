import GameSaveBtn from "./GameSaveButton/GameSaveButton";
import AddSaveButton from "./AddSaveButton/AddSaveButton";
import useSaveMeta from "../../hooks/useSaveMeta";
import APP from "../../constant/app";
import AddButton from "../../components/global/AddButton";

export default function HomePage() {
  const { metaData } = useSaveMeta();

  return (
    <div className="bg-bg2 rounded-lg w-full h-full p-4 overflow-y-scroll relative">
      <div className="flex flex-row items-start gap-3 flex-wrap">
        {metaData?.map((save: any) => (
          <GameSaveBtn key={save.id} saveMetaData={save} />
        ))}
        <AddSaveButton button={<AddButton />} />
      </div>
      <div className="absolute bottom-2 left-2 text-xs">
        {APP.PLATFORM} - {APP.VERSION} ({APP.ENV}){" "}
      </div>
    </div>
  );
}
 