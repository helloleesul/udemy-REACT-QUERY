import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Species } from "./Species";

// const initialUrl = "https://swapi.dev/api/species/";
const initialUrl = "https://swapi.py4e.com/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });
  /**
   *
   * pageParam은 가져와야 할 다음 페이지를 나타낸다.
   * getNextPageParam의 lastPage 또는 allPages 매개변수를 통해 관리된다.
   * hasNextPage값을 제어한다. (pageParam이 정의되면 true, undefined이면 false를 반환)
   * fetchNextPage로 컴포넌트가 데이터를 불러와야 할 때를 결정한다.
   * hasNextPage로 데이터를 그만 가져오게 할 수 있다.
   *
   */
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error! {error.toString()}</div>;
  }
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll
        loadMore={() => {
          // API 중복 호출 방지
          if (!isFetching) {
            fetchNextPage();
          }
        }}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) =>
          pageData.results.map((species) => (
            <Species
              key={species.name}
              name={species.name}
              language={species.language}
              averageLifespan={species.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
