import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
  cookie: string | undefined
}
async function changePassword(input: ChangePasswordInputType) {
  return http.post(API_ENDPOINTS.CHANGEPASS, input);
}
export const useChangePasswordMutation = () => {
  return useMutation(
    (input: ChangePasswordInputType) => changePassword(input),
    {
      onSuccess: () => {
        console.log("ChangePassword success response");
      },
      onError: () => {
        console.log("ChangePassword error response");
      },
    }
  );
};
