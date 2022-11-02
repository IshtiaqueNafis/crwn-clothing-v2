require("dotenv").config();
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (event) => {
    const {amount} = JSON.parse(event.body);

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "cad",
            payment_method_types: ["card"]
        })

        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        }
    } catch (e) {
        console.log({e})

        return {
            statusCode: 400,
            body: JSON.stringify({e})
        }
    }

}