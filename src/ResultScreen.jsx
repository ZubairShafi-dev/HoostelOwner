// ResultsScreen.js
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ResultsScreen = () => {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const snapshot = await firestore().collection('results').get();
        const data = snapshot.docs.map(doc => doc.data());
        setResultsData(data);
      } catch (error) {
        console.error('Error fetching results data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResultsData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={resultsData}
        keyExtractor={item => item.regNo.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>Reg No: {item.regNo}</Text>
            <Text style={styles.listText}>Name: {item.name}</Text>
            <Text style={styles.listText}>Marks: {item.marksPercentage}%</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ResultsScreen;
