package com.arogya.payment.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    public String createOrder(double amount, String receipt) throws RazorpayException {
        RazorpayClient razorpay = new RazorpayClient(keyId, keySecret);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", (int) (amount * 100)); // paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", receipt);

        Order order = razorpay.orders.create(orderRequest);
        return order.toString();
    }
}
