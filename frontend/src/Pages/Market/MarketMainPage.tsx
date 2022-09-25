import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import RegionCard from "./RegionCard";
import Card from "./StickerCard";
import { AiOutlineSearch, AiFillPlusCircle } from "react-icons/ai";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.article`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 5vw 0 5vw;
`;

const Search = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 2.5rem;
  margin-bottom: 1rem;

  input {
    background-color: transparent;
    border: solid 0.1px ${(props) => props.theme.colors.white};
    border-radius: 5px;
    width: 85%;
    height: 100%;
    color: ${(props) => props.theme.colors.white};
    padding: 1rem;
  }

  button {
    height: 100%;
    width: 3rem;
    color: ${(props) => props.theme.colors.white};
    background-color: transparent;

    .searchIcon {
      height: 100%;
      width: 100%;
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 45vh;

  .Header {
    display: flex;
    flex-direction: column;
    justify-content: end;
    p {
      font-size: ${(props) => props.theme.fontSizes.h3};
      color: ${(props) => props.theme.colors.white};
      font-weight: bold;
    }

    hr {
      width: 100%;
      border: solid 0.1px ${(props) => props.theme.colors.gray400};
    }

    button {
      text-align: right;
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      color: ${(props) => props.theme.colors.yellow};
      background-color: transparent;
    }
  }

  .CardList {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 32vh;
      overflow-y: hidden;
    }

    .swiper-wrapper {
      width: 100%;
      height: 32vh;
      display: -webkit-inline-box;
    }
  }
`;

const CateContainer = styled.article`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 15px;

  .Header {
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.white};
    font-weight: bold;

    hr {
      width: 100%;
      border: solid 0.1px ${(props) => props.theme.colors.gray400};
    }
  }

  .CateList {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 27vh;
      overflow-y: hidden;
    }

    .swiper-wrapper {
      width: 100%;
      height: 27vh;
      display: -webkit-inline-box;
    }
  }
`;

function MarketMainPage() {
  const result = [
    {
      marketId: 0,
      image:
        "https://www.infura-ipfs.io/ipfs/QmcqJiEjJon38JNzbsdgKhLBsjfWF8tZiUT5Mi7GQbtGP4",
      name: "NFT카드1",
      price: 123.5,
    },
    {
      marketId: 1,
      image:
        "https://www.infura-ipfs.io/ipfs/QmRkTWeyoREXuJ9s2vCtPTwvA1iaPjGS29Ei2fKZFZisGL",
      name: "NFT카드2",
      price: 123.5,
    },
    {
      marketId: 2,
      image:
        "https://www.infura-ipfs.io/ipfs/QmXyV1fnFM4EYv42KyfAyzXNX8bu73zpqQndoJBQPbL5pF",
      name: "NFT카드3",
      price: 123.5,
    },
    {
      marketId: 3,
      image:
        "https://www.infura-ipfs.io/ipfs/QmPPEWSC7qX7rzxE76XJLkNQk2d95r6BSfiPMS3tNs4p1y",
      name: "NFT카드4",
      price: 123.5,
    },
    {
      marketId: 4,
      image:
        "https://www.infura-ipfs.io/ipfs/QmQyqcdu8HhnN3tfJtzAduS59GJt4ZNxjSXnTaim72fxCU",
      name: "NFT카드5",
      price: 123.5,
    },
  ];

  const region = [
    {
      regionId: 1,
      name: "서울",
    },
    {
      regionId: 2,
      name: "부산",
    },
    {
      regionId: 3,
      name: "대구",
    },
    {
      regionId: 4,
      name: "인천",
    },
    {
      regionId: 5,
      name: "광주",
    },
    {
      regionId: 6,
      name: "대전",
    },
    {
      regionId: 7,
      name: "울산",
    },
    {
      regionId: 8,
      name: "세종",
    },
    {
      regionId: 9,
      name: "경기",
    },
    {
      regionId: 10,
      name: "강원",
    },
    {
      regionId: 11,
      name: "충북",
    },
    {
      regionId: 12,
      name: "충남",
    },
    {
      regionId: 13,
      name: "전북",
    },
    {
      regionId: 14,
      name: "전남",
    },
    {
      regionId: 15,
      name: "경북",
    },
    {
      regionId: 16,
      name: "경남",
    },
    {
      regionId: 17,
      name: "제주",
    },
  ];

  const [keyword, setKeyword] = useState("");

  const searchChange = (e: { target: { value: SetStateAction<string> } }) => {
    setKeyword(e.target.value);
  };

  const navigate = useNavigate();
  const moveToListPage = (regionId: Number) => {
    navigate("/market/" + regionId);
  };
  const moveToRegisterPage = () => {
    navigate("/market/register");
  };

  return (
    <>
      <Helmet>
        <title>마켓</title>
      </Helmet>
      <Container>
        <Search>
          <input
            type="text"
            value={keyword}
            onChange={searchChange}
            placeholder="검색어를 입력하세요."
          />{" "}
          <button>
            <AiOutlineSearch className="searchIcon" />
          </button>
        </Search>
        <CardContainer>
          <div className="Header">
            <p>
              판매 목록
              <button onClick={moveToRegisterPage}>
                {" "}
                <AiFillPlusCircle className="sell" />
              </button>
            </p>
            <hr />
            <button onClick={() => moveToListPage(0)}>전체 보기</button>
          </div>
          <div className="CardList">
            <Swiper slidesPerView={1.2} spaceBetween={13}>
              {result.length &&
                result.map((sticker, idx) => (
                  <SwiperSlide key={idx}>
                    <Card sticker={sticker} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </CardContainer>
        <CateContainer>
          <div className="Header">
            <p>카테고리</p>
            <hr />
          </div>
          <div className="CateList">
            <Swiper slidesPerView={1.9} spaceBetween={13}>
              {region.length &&
                region.map((region, idx) => (
                  <SwiperSlide key={idx}>
                    <RegionCard region={region} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </CateContainer>
      </Container>
    </>
  );
}

export default MarketMainPage;
