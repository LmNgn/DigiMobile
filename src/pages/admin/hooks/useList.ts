import { useQuery } from "@tanstack/react-query";
import { getList } from "../providers/dataProvider";
type useListParams = {
  resource: string;
};

export const useList = ({ resource }: useListParams) => {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
};
