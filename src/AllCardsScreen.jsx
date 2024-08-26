import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const AllCardScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardRow}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AttendanceList')}>
          <Text style={styles.cardText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('AllStudents')}>
          <Text style={styles.cardText}>All Students</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardRow}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Results')}>
          <Text style={styles.cardText}>Results</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.cardText}>HomeScreen</Text>
        </TouchableOpacity>
      </View>
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
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    height: 90,
    width: 150,
    padding: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cardText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AllCardScreen;
