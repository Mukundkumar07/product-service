import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/doctors'; // API Gateway

const HomeScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(BASE_URL);
            setDoctors(resp.data);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (search.length < 3) return;
        setLoading(true);
        try {
            const resp = await axios.get(`${BASE_URL}/search?specialization=${search}`);
            setDoctors(resp.data);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.doctorItem} onPress={() => navigation.navigate('DoctorProfile', { doctorId: item.id })}>
            <View style={styles.doctorAvatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.specialization}>{item.specialization}</Text>
                <Text style={styles.experience}>{item.experience} years experience</Text>
                <Text style={styles.fee}>₹{item.consultationFee}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search Doctors (Specialization, Clinic...)"
                style={styles.searchBar}
                value={search}
                onChangeText={(text) => { setSearch(text); handleSearch(); }}
            />

            {loading ? (
                <ActivityIndicator color="#007AFF" style={styles.loader} />
            ) : (
                <FlatList
                    data={doctors}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={styles.empty}>No doctors found</Text>}
                    onRefresh={fetchDoctors}
                    refreshing={loading}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
    searchBar: { backgroundColor: '#fff', padding: 15, borderRadius: 10, shadowOpacity: 0.1, marginBottom: 20 },
    doctorItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
    doctorAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E1E9FF', justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
    doctorInfo: { marginLeft: 15, flex: 1 },
    doctorName: { fontSize: 18, fontWeight: 'bold' },
    specialization: { fontSize: 14, color: '#666' },
    experience: { fontSize: 12, color: '#999' },
    fee: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold', marginTop: 5 },
    loader: { marginTop: 40 },
    empty: { textAlign: 'center', marginTop: 40, color: '#666' }
});

export default HomeScreen;
