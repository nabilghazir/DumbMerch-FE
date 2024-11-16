import { Stack } from "@mui/material"
import { CheckoutAddress } from "../../component/checkout/checkout-address"
import { CheckoutProduct } from "../../component/checkout/checkout-products"
import { PaymentSummary } from "../../component/checkout/payment-summary"

export const Transaction = () => {
    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
            }}>
            <Stack
                sx={{
                    paddingX: "50px",
                    width: "100%",
                    marginTop: "100px",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                <Stack
                    flex={1}
                    sx={{
                        width: "100%",
                        height: "100%",
                        gap: "20px"
                    }}>
                    <CheckoutAddress />
                    <CheckoutProduct />
                </Stack>
                <Stack
                    flex={1}
                    sx={{
                        alignItems: "flex-end"
                    }}>
                    <PaymentSummary />
                </Stack>
            </Stack>
        </Stack>
    )
}
