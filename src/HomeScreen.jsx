import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import firestore from '@react-native-firebase/firestore';
const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'attendance', title: 'Attendance'},
    {key: 'results', title: 'Results'},
    {key: 'students', title: 'Students'},
  ]);

  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    try {
      const snapshot = await firestore().collection('students').get();
      const data = snapshot.docs.map(doc => doc.data());
      setStudentsData(data);
    } catch (error) {
      console.error('Error fetching students data:', error);
    }
  };

  const renderAttendance = ({item}) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const status = item.attendance?.[today] || 'N/A'; // Get attendance status for today or 'N/A' if not available

    return (
      <View style={styles.listItem}>
        <Text style={styles.column}>{item.regNo || 'N/A'}</Text>
        <Text style={styles.column}>{item.name || 'N/A'}</Text>
        <Text style={styles.column}>{item.class || 'N/A'}</Text>
        <Text style={styles.column}>{status}</Text>
      </View>
    );
  };

  const renderStudents = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.column}>{item.regNo || 'N/A'}</Text>
      <Text style={styles.column}>{item.name || 'N/A'}</Text>
      <Text style={styles.column}>{item.studyProgress || 'N/A'}</Text>
    </View>
  );

  const renderScene = SceneMap({
    attendance: () => (
      <View style={styles.tabView}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Reg No.</Text>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Class</Text>
          <Text style={styles.columnHeader}>Status</Text>
        </View>
        <FlatList
          data={studentsData}
          keyExtractor={item =>
            item.regNo?.toString() || Math.random().toString()
          }
          renderItem={renderAttendance}
        />
      </View>
    ),
    students: () => (
      <View style={styles.tabView}>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Reg No.</Text>
          <Text style={styles.columnHeader}>Name</Text>
          <Text style={styles.columnHeader}>Study Progress</Text>
        </View>
        <FlatList
          data={studentsData}
          keyExtractor={item =>
            item.regNo?.toString() || Math.random().toString()
          }
          renderItem={renderStudents}
        />
      </View>
    ),
    results: () => (
      <View style={styles.tabView}>{/* Add results tab content here */}</View>
    ),
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.tabView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  tabView: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ccc',
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },
  column: {
    flex: 1,
    fontSize: 14,
  },
});

export default HomeScreen;
