import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/auth'; // API Gateway

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const sendOtp = async () => {
        try {
            await axios.post(`${BASE_URL}/send-otp`, { phone });
            setIsOtpSent(true);
            Alert.alert('Success', 'OTP sent successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const resp = await axios.post(`${BASE_URL}/verify-otp`, { phone, otp });
            // In real App, store JWT in AsyncStorage
            navigation.replace('Home');
        } catch (error) {
            Alert.alert('Error', 'Invalid OTP');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>MyArogya</Text>
            <Text style={styles.subtitle}>Secure Healthcare Login</Text>

            {!isOtpSent ? (
                <>
                    <TextInput
                        placeholder="Mobile Number"
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <TouchableOpacity style={styles.button} onPress={sendOtp}>
                        <Text style={styles.buttonText}>Send OTP</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput
                        placeholder="6-Digit OTP"
                        style={styles.input}
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                        <Text style={styles.buttonText}>Verify & Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsOtpSent(false)}>
                        <Text style={styles.resend}>Change Number</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
    logo: { fontSize: 32, fontWeight: 'bold', color: '#007AFF', textAlign: 'center' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 40, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 20 },
    button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    resend: { color: '#007AFF', textAlign: 'center', marginTop: 20 }
});

export default LoginScreen;
