import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function Tasks() {
    return (
        <View style={styles.Gcontainer}>
                <Text style={styles.Tasks}>Task</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  Gcontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 10,
  },    
});
