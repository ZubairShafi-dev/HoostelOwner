import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ClassSelectionScreen = ({route, navigation}) => {
  const {campus} = route.params; // Get the selected campus
  const classes =
    campus === 'Khalqia Government'
      ? ['1', '2', '3', '4', '5'] // Hardcoded classes for Khalqia Government
      : ['6', '7', '8', '9', '10', '11', '12']; // Hardcoded classes for Khalqia Higher Secondary

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Class from {campus}</Text>
      {classes.map((className, index) => (
        <TouchableOpacity
          key={index}
          style={styles.classCard}
          onPress={() =>
            navigation.navigate('AttendanceList', {campus, className})
          }>
          <Text style={styles.classText}>{className}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
  classCard: {
    width: '80%',
    padding: 20,
    backgroundColor: '#17a2b8',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClassSelectionScreen;
