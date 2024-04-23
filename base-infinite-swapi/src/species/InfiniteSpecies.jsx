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
