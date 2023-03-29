import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface UpdateUserType {
  fullName: string;
  address: string
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  identifyAs: string;
  cookie: string | undefined
}
async function updateUser(input: UpdateUserType) {
  return http.post(API_ENDPOINTS.UPDATE, input);
}
export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: () => {
      console.log("UpdateUser success response");
    },
    onError: () => {
      console.log("UpdateUser error response");
    },
  });
};
