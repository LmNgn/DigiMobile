import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOne } from "../providers/dataProvider";
import { message } from "antd";

type useDeleteParams = {
  resource: string;
  id?: number | string;
};

export const useDelete = ({ resource }: useDeleteParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id?: number | string) => deleteOne({ resource, id }),
    onSuccess: () => {
      message.success("Xóa thành công.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
