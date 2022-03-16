import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

import { Header, Input, Icon } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { getDatabase, push, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGJbh7JyjDWbwAXlOa9xkn2BzgNgHS8vc",
  authDomain: "shopping-62e7f.firebaseapp.com",
  databaseURL:
    "https://shopping-62e7f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shopping-62e7f",
  storageBucket: "shopping-62e7f.appspot.com",
  messagingSenderId: "365157876761",
  appId: "1:365157876761:web:f59d10bf93d75142251688",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  ref(database, "items/");

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      setItems(Object.values(data));
    });
  }, []);

  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");
  const [items, setItems] = useState([]);

  const saveItem = () => {
    push(ref(database, "items/"), { product: product, amount: amount });
    setProduct("");
    setAmount("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Input
          placeholder="product"
          value={String(product)}
          onChangeText={(text) => setProduct(text)}
          //keyboardType="numeric"
        />
        <Input
          placeholder="amount"
          value={String(amount)}
          onChangeText={(text) => setAmount(text)}
          //keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title=" ADD " onPress={saveItem} />
      </View>
      <View style={styles.historyContainer}>
        <Text style={{ fontSize: 18 }}>History</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
