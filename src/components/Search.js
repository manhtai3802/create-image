import { Input, Image, Button, Card } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import { debounce } from "../utils";
import "./Search.css";

const Search = () => {
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };
  const [keySearch, setKeySearch] = useState("");
  const [limit, setLimit] = useState(8);
  const [data, setData] = useState();

  const getApi = useCallback(
    debounce(async (keySearch, limit) => {
      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=rzhjIBdamAIky7HOyoRRmUViNLyrVJKQ&q=${keySearch}&limit=${limit}&offset=8&rating=g&lang=en`
        );
        if (response) {
          setData(response.data?.data);
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000),
    []
  );

  const handleChangeInput = (e) => {
    setKeySearch(e.target.value);
  };

  const handleLoadMore = () => {
    setLimit(limit + 8);
  };

  useEffect(() => {
    getApi(keySearch, limit);
  }, [keySearch, limit]);
  return (
    <div>
      <Input
        placeholder="Start search for image"
        onChange={handleChangeInput}
      />

      <div>
        <Card>
          {data?.map((val) => (
            <Card.Grid style={gridStyle}>
              <Image src={val.images.original.url} width={200} />
            </Card.Grid>
          ))}
        </Card>
      </div>
      <div className="btn_load_more">
        <Button
          type="primary"
          shape="round"
          onClick={handleLoadMore}
          icon={<ArrowDownOutlined />}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Search;
