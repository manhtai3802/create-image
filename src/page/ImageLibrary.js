import { Tabs } from "antd";
import Search from "../components/Search";
import Favorites from "../components/Favorites";

const ImageLibrary = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="search"
        onChange={onChange}
        items={[
          {
            label: `Search`,
            key: "search",
            children: <Search />,
          },
          {
            label: `Favorites`,
            key: "favorites",
            children: <Favorites />,
          },
        ]}
      />
    </div>
  );
};

export default ImageLibrary;
