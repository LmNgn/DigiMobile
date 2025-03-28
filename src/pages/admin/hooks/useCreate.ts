import { useMutation } from "@tanstack/react-query";
import { create } from "../providers/dataProvider";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

type useListParams = {
  resource: string;
};

export const useCreate = <T,>({ resource }: useListParams) => {
  const nav = useNavigate();
  return useMutation({
    mutationFn: (values: T) => create({ resource, values }),
    onSuccess: () => {
      message.success("Thêm thành công");
      nav(`/admin/${resource}`);
    },
  });
};