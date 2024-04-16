import { FaDiscord, FaGithub, FaYoutube } from 'react-icons/fa';
import { MdNotifications, MdSettings } from 'react-icons/md';
import { Button, Select } from '@radix-ui/themes';
import { useHistory } from 'react-router-dom';
import IconImage from '../../../../assets/icon.png';
import Settings from './Settings/Settings';
// import SupportMe from './SupportMe/SupportMe';

export default function AboutSection() {
  const history = useHistory();

  return (
    <div className="flex gap-2 p-2 bg-bg2 rounded-lg items-center relative">
      <div
        onClick={() => {
          history.push('/');
        }}
        className="flex gap-2 cursor-pointer"
      >
        <img src={IconImage} alt="icon" className="w-6 h-6" />
        <span>palserver GUI</span>
      </div>
      <div className="absolute right-2 flex gap-2 items-center">
        {/* 切換語言 */}
        {/* <Button size="1">加入 Discord</Button>
        <Button size="1" color="pink">
          支持我們
        </Button> */}
        <Settings />
        {/* <SupportMe /> */}
        {/* <Button onClick={handleOpenYoutube}>
          <FaYoutube color="#ff5555" />
        </Button>
        <Button onClick={handleOpenGithub}>
          <FaGithub />
        </Button>
        <Button onClick={handleOpenDiscord}>
          <FaDiscord />
        </Button> */}
      </div>
    </div>
  );
}
//  <Select.Root
//    size="1"
//    value={language}
//    onValueChange={(v) => {
//      // @ts-ignore
//      setLanguage(v);
//    }}
//  >
//    <Select.Trigger style={{ background: '#1b1421', color: 'white' }} />
//    <Select.Content style={{ background: '#1b1421', color: 'white' }}>
//      <Select.Item value="zh_tw">繁體中文</Select.Item>
//      {/* <Select.Item value="zh_cn">简体中文</Select.Item> */}
//      <Select.Item value="en">English</Select.Item>
//      {/* <Select.Item value="jp">日本語</Select.Item> */}
//    </Select.Content>
//  </Select.Root>;
