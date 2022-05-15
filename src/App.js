import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "="];
const ops = ["D", "+", "-", "/", "*"];

function App() {
  const [result, setResult] = useState("");
  const [expression, setExpression] = useState("");

  const onPressNum = (num) => {
    if (num === "=") {
      switch (expression[expression.length - 1]) {
        case "+":
        case "-":
        case "/":
        case "*":
          return;
        default:
          setResult(eval(expression));
          return;
      }
    }
    setExpression((prev) => prev + num);
  };

  const onPressOp = (op) => {
    switch (op) {
      default:
        if (!expression) return;
    }
    if (op === "D") {
      setExpression((prev) => {
        const newExp = prev.slice(0, prev.length - 1);
        console.log(newExp);
        return newExp;
      });
      return;
    }
    setExpression((prev) => prev + op);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressNum(item)}
        style={{
          height: (Dimensions.get("window").height - 150) / 4,
          justifyContent: "center",
          flex: 1,
          alignItems: "center"
        }}
      >
        <Text style={styles.num}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.outputView}>
        <View
          style={{
            padding: 5,
            backgroundColor: "blue",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <Text>{expression}</Text>
        </View>
        <View
          style={{
            padding: 5,
            backgroundColor: "grey",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end"
          }}
        >
          <Text>{result}</Text>
        </View>
      </View>
      <View style={styles.calcView}>
        <FlatList
          numColumns={3}
          data={nums}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{
            backgroundColor: "green"
          }}
        />
        <View style={{ width: 80 }}>
          {ops.map((item) => (
            <TouchableOpacity
              onPress={() => onPressOp(item)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: (Dimensions.get("window").height - 150) / 5
              }}
            >
              <Text style={styles.num}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  outputView: {
    height: 150
  },
  calcView: {
    height: Dimensions.get("screen").height - 150,
    backgroundColor: "red",
    flexDirection: "row"
  },
  num: {
    color: "black"
  }
});

export default App;
