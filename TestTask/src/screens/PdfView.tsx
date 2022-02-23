import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pdf from 'react-native-pdf';

const PdfView = props => {
  const url = props.route.params && props.route.params.url;

  const source = {
    uri: url,
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={numberOfPages => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={page => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: wp('100%'),
    height: hp('90%'),
  },
});

export default PdfView;
