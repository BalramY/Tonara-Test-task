import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Data {
  id: number;
  title: string;
  description: string;
  days: string;
  days_practiced: string;
  daily_practice_time: string;
  music_genre: string;
}

const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<Data>();
  const [searchData, setSearchData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getData();
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, []);

  const getData = () => {
    setLoading(true);
    fetch('http://192.168.1.191:8000/api/v1/assignment/', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('----get response----', responseJson);
        setData(responseJson);
        setSearchData(responseJson);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const Item = ({item}) => (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 5,
        padding: hp('2%'),
        marginHorizontal: hp('3%'),
        marginBottom: hp('2%')
      }}>
      <Text
        style={{
          fontSize: 18,
          color: '#333333',
          fontWeight: '700',
          marginBottom: hp('2%'),
        }}>
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#828282',
          fontWeight: '400',
          marginBottom: hp('3%'),
        }}>
        {item.description}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 14,
            color: '#333333',
            fontWeight: '400',
            marginBottom: hp('2%'),
          }}>
          {item.days_practiced +
            ' days / ' +
            item.daily_practice_time +
            ' per day'}
        </Text>
        <Image
          style={{height: hp('3%'), width: hp('3%')}}
          source={require('../assets/user.png')}
        />
      </View>
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

  const renderEmpty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 14,
            color: '#333333',
            fontWeight: '400',
          }}>
          No Assignments
        </Text>
      </View>
    );
  };

  const search = (txt) => {
    setSearchText(txt);
    let text = txt.toLowerCase();
    let filter = data.filter((item) => {
      if (item?.title?.toLowerCase().match(text)) {
        return item;
      }
    });
    console.log('----filter-----',filter,txt)
    if(txt){
    setSearchData(filter);
    }
    else{
    setSearchData(data);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/books.jpg')}
        style={styles.topBgImage}>
        <View style={{paddingTop: hp('3%')}}>
          <Image
            source={require('../assets/menu.png')}
            style={{
              height: hp('5%'),
              width: hp('5%'),
              marginRight: hp('5%'),
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: hp('5%'),
        }}>
        <Image
          source={require('../assets/girlpic.jpg')}
          style={{
            height: hp('14%'),
            width: hp('14%'),
            marginTop: hp('-7%'),
            borderRadius: 50,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDetails')}
          style={{
            backgroundColor: 'white',
            padding: hp('2%'),
            alignSelf: 'center',
            marginTop: hp('-3%'),
            borderRadius: 50,
          }}>
          <Image
            source={require('../assets/add.png')}
            style={{height: hp('5%'), width: hp('5%'), borderRadius: 50}}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Search"
        value={searchText}
        style={{
            width: wp('85%') ,
            height: 40,
            marginTop:hp('2%'),
           alignSelf:"center",
            borderColor: '#D8D8D8',
            borderRadius:20,
            backgroundColor: 'white',
            paddingLeft:20,
          }}
        onChangeText={(e: string) => {
          search(e);
        }}
        placeholderTextColor={'black'}
      />
      <View style={{marginTop: hp('3%'),paddingBottom:hp('24%')}}>
        {loading ? (
          <ActivityIndicator color="#333333" size="large" />
        ) : (
          <FlatList
            data={searchData}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  topBgImage: {height: hp('20%'), width: wp('100%')},
});

export default Home;
