import React, { useEffect, useState } from "react";
import "./PaymentDetails.scss";
import { CountryDropdown } from "react-country-region-selector";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";

import FormInput from "../forms/FormInput/FormInput";
import Button from "../forms/Button/Button";
import { api } from "../../utils/utils";
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "../../redux/Cart/cart.selectors";
import { clearCart } from "../../redux/Cart/cart.actions";
import { saveOrderHistory } from "../../redux/Orders/orders.actions";

const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemsCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const history = useHistory();
  const { total, itemsCount, cartItems } = useSelector(mapState);
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  useEffect(() => {
    if (itemsCount < 1) {
      history.push("/dashboard");
    }
  }, [itemsCount]);

  const handleShippingState = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBillingState = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement("card");

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.country ||
      !shippingAddress.postal_code ||
      !billingAddress.line1 ||
      !billingAddress.postal_code ||
      !billingAddress.state ||
      !billingAddress.country ||
      !billingAddress.city ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    api
      .post("/payments/create", {
        amount: total * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                const configOrder = {
                  orderTotal: total,
                  orderItems: cartItems.map((item) => {
                    const {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    } = item;
                    return {
                      documentID,
                      productThumbnail,
                      productName,
                      productPrice,
                      quantity,
                    };
                  }),
                };

                dispatch(saveOrderHistory(configOrder));
              });
          });
      });
  };

  const configCardElement = {
    iconStyle: "solid",
    style: {
      base: {
        fontSize: "16px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="group">
          <h2>Shipping Address</h2>

          <FormInput
            required
            type="text"
            placeholder="Recipient Name"
            value={recipientName}
            name="recipientName"
            handleChange={(e) => setRecipientName(e.target.value)}
          />

          <FormInput
            required
            type="text"
            placeholder="Line 1"
            value={shippingAddress.line1}
            name="line1"
            handleChange={(e) => handleShippingState(e)}
          />

          <FormInput
            type="text"
            placeholder="Line 2"
            value={shippingAddress.line2}
            name="line2"
            handleChange={(e) => handleShippingState(e)}
          />

          <FormInput
            required
            type="text"
            placeholder="City"
            value={shippingAddress.city}
            name="city"
            handleChange={(e) => handleShippingState(e)}
          />

          <FormInput
            required
            type="text"
            placeholder="State"
            value={shippingAddress.state}
            name="state"
            handleChange={(e) => handleShippingState(e)}
          />

          <FormInput
            required
            type="text"
            placeholder="Postal Code"
            value={shippingAddress.postal_code}
            name="postal_code"
            handleChange={(e) => handleShippingState(e)}
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleShippingState({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
        </div>

        <div className="group">
          <h2>Billing Address</h2>
          <FormInput
            required
            type="text"
            placeholder="Name on card"
            value={nameOnCard}
            name="nameOnCard"
            handleChange={(e) => setNameOnCard(e.target.value)}
          />

          <FormInput
            required
            type="text"
            placeholder="Line 1"
            value={billingAddress.line1}
            name="line1"
            handleChange={(e) => handleBillingState(e)}
          />

          <FormInput
            type="text"
            placeholder="Line 2"
            value={billingAddress.line2}
            name="line2"
            handleChange={(e) => handleBillingState(e)}
          />

          <FormInput
            required
            type="text"
            placeholder="City"
            value={billingAddress.city}
            name="city"
            handleChange={(e) => handleBillingState(e)}
          />

          <FormInput
            required
            type="text"
            placeholder="State"
            value={billingAddress.state}
            name="state"
            handleChange={(e) => handleBillingState(e)}
          />

          <FormInput
            required
            type="text"
            placeholder="Postal Code"
            value={billingAddress.postal_code}
            name="postal_code"
            handleChange={(e) => handleBillingState(e)}
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              onChange={(val) =>
                handleBillingState({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
            />
          </div>
        </div>

        <div className="group">
          <h2>Card Details</h2>
          <CardElement options={configCardElement} />
        </div>

        <Button type="submit">Pay Now</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
