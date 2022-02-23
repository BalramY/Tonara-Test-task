import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import TextInput from './TextInput';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AddDetails = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [days, setDays] = useState('');
  const [daysPractice, setDaysPractice] = useState('');
  const [timePractice, setTimePractice] = useState('');
  const [music, setMusic] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const onSubmit = () => {
    const data = {
      title: title,
      description: description,
      music_genre: music,
      daily_practice_time: timePractice,
      days: days,
      days_practiced: daysPractice,
      pdf: pdfUrl,
    };
    fetch('http://192.168.1.191:5000/api/v1/assignment/', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('----post response----', responseJson);
        Alert.alert('Details Saved');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const validation = () => {
    if (
      title === '' ||
      description === '' ||
      music === '' ||
      daysPractice === '' ||
      days === '' ||
      timePractice === '' ||
      pdfUrl === ''
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={30}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={{alignItems: 'center'}}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={(text: string) => setTitle(text)}
          width={wp('80%')}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={(text: string) => setDescription(text)}
          width={wp('80%')}
        />
        <TextInput
          placeholder="Music Genre"
          value={music}
          onChangeText={(text: string) => setMusic(text)}
          width={wp('80%')}
        />
        <TextInput
          placeholder="Daily Practice Time"
          value={timePractice}
          onChangeText={(text: string) => setTimePractice(text)}
          width={wp('80%')}
        />
        <TextInput
          placeholder="Days"
          value={days}
          onChangeText={(text: string) => setDays(text)}
          width={wp('80%')}
        />
        <TextInput
          placeholder="Days Practiced"
          value={daysPractice}
          onChangeText={(text: string) => setDaysPractice(text)}
          width={wp('80%')}
        />
        <TextInput
          placeholder="Pdf URL"
          value={pdfUrl}
          onChangeText={(text: string) => setPdfUrl(text)}
          width={wp('80%')}
        />
        <TouchableOpacity
          disabled={validation()}
          onPress={() => onSubmit()}
          style={[
            styles.button,
            {backgroundColor: validation() ? '#828282' : '#333333'},
          ]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: '#F3F6FA',
    paddingVertical: hp('3%'),
    paddingHorizontal: hp('2%'),
    flex: 1,
  },
  buttonText: {fontSize: 15, color: 'white'},
  button: {
    marginVertical: 30,
    paddingVertical: hp('2%'),
    width: wp('50%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  headerText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#333333',
    fontWeight: '700',
    marginBottom: hp('2%'),
  },
});

export default AddDetails;
