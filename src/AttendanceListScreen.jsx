import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker'; // Updated import

const AttendanceScreen = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('All'); // State to hold the selected class
  const classes = [
    'All',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10',
    'Class 11',
    'Class 12',
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all students
        const studentsSnapshot = await firestore().collection('students').get();
        const students = studentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch all attendance records
        const attendanceSnapshot = await firestore()
          .collection('attendance')
          .get();
        const attendanceRecords = attendanceSnapshot.docs.flatMap(doc => {
          const data = doc.data();
          return data.attendance || [];
        });

        // Combine data
        const combined = students
          .map(student => {
            const studentAttendance = attendanceRecords.filter(
              record => record.userId === student.id,
            );
            return studentAttendance.map(record => ({
              regNo: student.regNo,
              name: student.name,
              studentClass: student.studentClass,
              status: record.status,
              date: record.date,
            }));
          })
          .flat();

        setStudentsData(students);
        setAttendanceData(attendanceRecords);
        setCombinedData(combined);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter combined data based on the selected class
  useEffect(() => {
    if (studentsData.length > 0 && attendanceData.length > 0) {
      const filteredData = studentsData
        .filter(
          student =>
            selectedClass === 'All' || student.studentClass === selectedClass,
        )
        .flatMap(student => {
          const studentAttendance = attendanceData.filter(
            record => record.userId === student.id,
          );
          return studentAttendance.map(record => ({
            regNo: student.regNo,
            name: student.name,
            studentClass: student.studentClass,
            status: record.status,
            date: record.date,
          }));
        });

      setCombinedData(filteredData);
    }
  }, [selectedClass, studentsData, attendanceData]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClass}
          style={styles.picker}
          onValueChange={itemValue => setSelectedClass(itemValue)}>
          {classes.map(cls => (
            <Picker.Item key={cls} label={cls} value={cls} />
          ))}
        </Picker>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Reg No</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Class</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Date</Text>
      </View>
      <FlatList
        data={combinedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.regNo}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.studentClass}</Text>
            <Text style={styles.cell}>{item.status}</Text>
            <Text style={styles.cell}>{item.date}</Text>
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
  pickerContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
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

export default AttendanceScreen;
