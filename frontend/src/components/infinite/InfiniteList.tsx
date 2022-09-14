import styled from "@emotion/styled";
import React, { useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import fetchData from "../../utils/apis/api";
import { isQueryError } from "../../utils/functions/util";
import useObserver from "../../utils/hooks/useObserver";

interface InifinteListProps {
  url: string;
  queryKey: string;
  CardComponent: React.ElementType;
  SkeletonCardComponent: React.ElementType;
  zeroDataText: string;
  func: object;
  count: number;
}

type GridProps = {
  gridColumnCount: number;
};

const GridContainer = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridColumnCount ?? `repeat(${props.gridColumnCount}, 1fr)}`};
  grid-gap: 1rem;
`;

function InfiniteList({
  url,
  queryKey,
  CardComponent,
  SkeletonCardComponent,
  zeroDataText,
  func,
  count,
}: InifinteListProps) {
  const [hasError, setHasError] = useState(false);
  const bottom = useRef(null);
  const getTargetComponentList = async ({ pageParam = 0 }) => {
    if (pageParam) return;
    try {
      const res = await fetchData.get({ url: `${url}?page=${pageParam}` });
      return { data: res?.data, page: pageParam };
    } catch (_) {
      setHasError(true);
      return undefined;
    }
  };
  const {
    isLoading,
    data,
    error,
    isError,
    isSuccess,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(queryKey, getTargetComponentList, {
    getNextPageParam: (lastPage: any) => {
      if (lastPage?.data?.hasOwnPropery("hasMore")) {
        const {
          data: { hasMore },
        } = lastPage;
        if (hasMore) return lastPage.page + 1;
        return false;
      }
      return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    hasMore:
      data?.pageParams && data?.pageParams?.length > 1
        ? Boolean(data?.pageParams[data.pageParams.length - 1])
        : true,
    hasError,
    error,
    onIntersect,
  });

  return (
    <div>
      {data?.pages[0]?.data?.resultList.length < 1 && <div>{zeroDataText}</div>}
      {isLoading && <div>Loading ...</div>}
      {isError && isQueryError(error) && <p>{error?.message}</p>}
      {isSuccess &&
        data.pages.map((group: any, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <GridContainer key={index} gridColumnCount={count}>
            {group?.data?.resultList?.map((card: any, idx: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <CardComponent card={card} key={idx} func={func} />
            ))}
          </GridContainer>
        ))}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <div>
          {[...Array(count).keys()].map((i) => (
            <SkeletonCardComponent key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InfiniteList;
