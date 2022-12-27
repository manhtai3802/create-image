import { Input, Image, Button, Card } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ArrowDownOutlined, HeartFilled } from "@ant-design/icons";
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
  const [offset, setOffset] = useState(0);
  const [addDataFavorite, setAddFavorite] = useState();
  const getApi = useCallback(
    debounce(async (keySearch, limit, offset) => {
      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=rzhjIBdamAIky7HOyoRRmUViNLyrVJKQ&q=${keySearch}&limit=${
            keySearch === "" ? setLimit(8) : limit
          }&offset=${offset}&rating=g&lang=en`
        );

        if ((keySearch = "")) setLimit(8);
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
    setOffset(offset + 8);
  };

  const handleAddFavorites = (url) => {
    // setAddFavorite(url);
    // localStorage.setItem("favorites", JSON.stringify(addDataFavorite));
  };

  useEffect(() => {
    getApi(keySearch, limit, offset);
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
              <div>
                <Image src={val.images.original.url} width={200} />
                <Button
                  type="primary"
                  className="btn_favorites active"
                  onClick={handleAddFavorites(
                    data.map((val) => val.images.original.url)
                  )}
                >
                  <HeartFilled />
                </Button>
              </div>
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
