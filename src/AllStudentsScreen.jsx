// AllStudentsScreen.js
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AllStudentsScreen = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const snapshot = await firestore().collection('students').get();
        const data = snapshot.docs.map(doc => doc.data());
        setStudentsData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching students data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      const filtered = studentsData.filter(
        student =>
          student.regNo.toLowerCase().includes(lowercasedQuery) ||
          student.name.toLowerCase().includes(lowercasedQuery),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(studentsData);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Reg No or Name"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Reg No</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Class</Text>
        <Text style={styles.headerText}>Study Progress</Text>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.regNo.toString()}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.regNo}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.class || 'N/A'}</Text>
            <Text style={styles.cell}>{item.studyProgress}</Text>
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
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AllStudentsScreen;
