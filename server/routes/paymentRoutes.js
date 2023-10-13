import braintree from "braintree";
import express from "express";

const router = express.Router();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID || "sxd9nrwy2bwkr8m3",
    publicKey: process.env.BRAINTREE_PUBLIC_KEY || "43z3f2763gncwm8v",
    privateKey:
        process.env.BRAINTREE_PRIVATE_KEY || "768b1b9f5f56d6935990d317d8faa3d7",
});

router.get("/client_token", (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            res.send(response.clientToken);
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.post("/createPaymentTransaction", async (req, res) => {
    const { amount, nonce, deviceData, test } = req.body;

    try {
        //create a transaction
        const result = await gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: test ? 'fake-valid-nonce' : nonce,
            options: {
                submitForSettlement: true,
            },
            deviceData: deviceData,
        });
        console.log(result);
        res.status(200).json({
            isPaymentSuccessful: result.success,
            errorText: result.transaction?.processorResponseText || "",
        });
    } catch (error) {
        console.log("Error in creating transaction ", error);
        res.status(400).json({
            isPaymentSuccessful: false,
            errorText: "Error in creating the payment transaction" + error,
        });
    }
});

export default router;
