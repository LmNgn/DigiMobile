import { useQuery } from "@tanstack/react-query";
import { getOne } from "../providers/dataProvider";
type useOneParams = {
  resource: string;
  id?: number | string;
};

export const useOne = ({ resource, id }: useOneParams) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => getOne({ resource, id }),
    enabled: !!id,
  });
};
