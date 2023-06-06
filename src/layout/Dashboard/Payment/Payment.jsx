import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { Elements} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../Checkout/Checkout";

const stripePromise = loadStripe('pk_test_51NFV1sCJxnWqbAIJ156QGc5eUMNrjRJxnXBUQX8AaACgtOAQC2LdoFYWULXrxKUvohLVwePcqTfgNfSCv1gLHwh300q6KMkB94');
const Payment = () => {
    return (
        <div className="w-1/2 mx-auto ">
             <SectionTitle heading={ 'payment'} subHeading={'payment here'}></SectionTitle>
             <Elements stripe={stripePromise}>
                 <Checkout></Checkout>
             </Elements>
             
        </div>
    );
};

export default Payment;