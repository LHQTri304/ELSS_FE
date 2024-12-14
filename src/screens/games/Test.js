/* import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import {UIHeader} from '../components';

export default function GameTab(props) {
  return (
    <View style={styles.container}>
      <UIHeader title={'Mini Games'} />
      <View style={styles.view}>
        <Text style={styles.text}>Coming Soon...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1, 
    paddingBottom: '30%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
 */

/* import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

export default GameTab = () => {
  const [number, setNumber] = useState(0);

  const generateRandomNumber = async () => {
    try {
      const response = await axios.get('http://192.168.132.41:3000/random-number');
      setNumber(response.data.number);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <TouchableOpacity style={styles.button} onPress={generateRandomNumber}>
        <Text style={styles.buttonText}>Generate Number</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  number: {
    color: 'white',
    fontSize: 50,
  },
  button: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default GameTab = () => {
  const [query, setQuery] = useState('random'); //Nếu người  dùng không nhập gì, trả về ngậu nhiên, tránh lỗi null
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (newPage = 1) => {
    if (loading) return; // Tránh gửi nhiều yêu cầu đồng thời
    setLoading(true);

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=37OSAJ64LuiTnV_tB51bcwQ8pmUerd_BgYXOwIVAxW8&page=${newPage}&per_page=20`
    );
    const data = await response.json();

    if (newPage === 1) {
      setImages(data.results); // Nếu là trang đầu tiên, ghi đè dữ liệu
    } else {
      setImages((prev) => [...prev, ...data.results]); // Nếu là trang tiếp theo, nối dữ liệu
    }

    setPage(newPage);
    setLoading(false);
  };

  const loadMore = () => {
    fetchImages(page + 1); // Tải thêm hình ảnh từ trang tiếp theo
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter keyword..."
        value={query}
        onChangeText={setQuery}
      />
      <Button
        title="Search"
        onPress={() => fetchImages(1)} // Bắt đầu tìm kiếm mới, reset về trang 1
      />
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.urls.small }}
            style={styles.image}
          />
        )}
        //onEndReached={loadMore} // Gọi loadMore khi cuộn đến cuối danh sách
        onEndReachedThreshold={0.5} // Kích hoạt loadMore khi cuộn đến 50% của cuối danh sách
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  image: { height: 200, width: '100%', marginVertical: 10 },
});
