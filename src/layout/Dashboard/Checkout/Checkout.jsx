import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../Provider/AuthProvider";


const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {user } = useContext(AuthContext)
    const [errorP, setErrorP] = useState('')
    const [carts] = useCart();
    const [clientSecret, setClientSecret] = useState("");
    const [processing , setProcessing] = useState(false)
    const total = user && carts.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total?.toFixed(2));
    // console.log(price);
    const token = localStorage.getItem('access-token')

    useEffect(() => {
        if(price){
            fetch('http://localhost:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  authorization : `bearer ${token}`
                },
                body: JSON.stringify({price})
              })
                .then(res => res.json())
                .then(data => setClientSecret(data.clientSecret))
                .catch(error => console.error(error));
        }
      }, [price]);
      




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }
        


        setProcessing(true)
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErrorP(error.message)
            console.log('[error]', error);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }


        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: user?.name,
                  email : user?.email

                },
              },
            },
          );
          setProcessing(false)

          if(confirmError){
            console.log(confirmError);
          }
        console.log( 'payment intent',paymentIntent);
        
       if(paymentIntent?.status === 'succeeded'){
        // alert('congratulation')
        const payment = { 
            name : user?.name,
            email : user?.email,
            transaction: paymentIntent?.id,
            total_item : carts.length  ,
            itemNames : carts.map(item => item.name),
            itemId : carts.map(item => item._id),
            
            
        }

        fetch('http://localhost:5000/payment', {
            method : "POST", 
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(payment)
        })
        .then(res => res.json())
        .then(data => console.log(data))
       }

    }





    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {

                            base: {

                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },


                            },
                            invalid: {
                                color: '#9e2146',

                            },
                        },
                    }}
                />
                <button className="btn btn-primary mt-3" type="submit" disabled={!stripe }>
                    Pay
                </button>
            </form>
            <p>{errorP && errorP}</p>
        </div>
    );
};

export default Checkout;