// import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
// import http from "@framework/utils/http";
import { useMutation } from "react-query";

export interface CheckoutInputType {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}
async function checkout(input: CheckoutInputType) {
  // return http.post(API_ENDPOINTS.ChangeEmail, input);
  return input;
}
export const useCheckoutMutation = () => {
  return useMutation((input: CheckoutInputType) => checkout(input), {
    onSuccess: (data) => {
      console.log(data, "Request sent");
    },
    onError: (data) => {
      console.log(data, "Request not sent");
    },
  });
};
