import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";


const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {user,loading } = useContext(AuthContext)
    const [errorP, setErrorP] = useState('')
    const [carts,refetch] = useCart();
    const [clientSecret, setClientSecret] = useState("");
    const [processing , setProcessing] = useState(false)
    const total = user && carts.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total?.toFixed(2));
    const [message , setMessage] = useState('')
    // console.log(price);
    const token = localStorage.getItem('access-token')

    useEffect(() => {
        if(price > 0){
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
      }, [price,loading]);
      




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

        if (!clientSecret) {
            
            console.error("Invalid client secret");
            return;
        }
        console.log("Client Secret:", clientSecret);
        
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
        setProcessing(true)
        
        setMessage(`thank for purchasing. your transaction Id : ${paymentIntent.id}`)
        
        // alert('congratulation')
        const payment = { 
            name : user?.name,
            email : user?.email,
            data : new Date(),
            transaction: paymentIntent?.id,
            total_item : carts?.length  ,
            itemNames : user && carts?.map(item => item.name),
            itemId : user && carts?.map(item => item._id),
            foodId : user && carts?.map(item => item.foodId)
            
            
        }

        fetch('http://localhost:5000/payment', {
            method : "POST", 
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(payment)
        })
        .then(res => res.json())
        .then(data => {
            if(data.result.insertedId ){
                refetch();
                
            }
            
        })
        
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
                <button className="btn btn-primary mt-3" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p>{errorP && errorP}</p>
            <p>{message && message}</p>
        </div>
    );
};

export default Checkout;