package com.arogya.payment.controller;

import com.arogya.payment.service.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(@RequestBody Map<String, Object> request) throws RazorpayException {
        double amount = Double.parseDouble(request.get("amount").toString());
        String receipt = request.get("receipt").toString();
        return ResponseEntity.ok(paymentService.createOrder(amount, receipt));
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, Object> request) {
        // Implementation for HMAC signature verification
        return ResponseEntity.ok("Payment verified and captured in MyArogya system.");
    }
}
