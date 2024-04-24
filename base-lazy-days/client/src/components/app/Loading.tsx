import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";

export function Loading() {
  // will use React Query `useIsFetching` to determine whether or not to display
  const isFetching = useIsFetching();
  // useIsFetching 현재 가져오는 쿼리의 수를 알려주는 훅, 0이면 false
  const display = isFetching ? "inherit" : "none";

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
