// CampusSelectionScreen.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CampusSelectionScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('ClassSelection', {campus: 'Khalqia Government'})
        }>
        <Text style={styles.cardText}>Khalqia Government</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('ClassSelection', {
            campus: 'Khalqia Higher Secondary',
          })
        }>
        <Text style={styles.cardText}>Khalqia Higher Secondary</Text>
      </TouchableOpacity>
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
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CampusSelectionScreen;
