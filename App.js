/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import Torch from 'react-native-torch';
import database from '@react-native-firebase/database';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const bgImage = require('./ios/MidiTorchClient/Images.xcassets/fkcbg.imageset/fkcbg.jpg');

const App = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);

  const handlePress = () => {
    Torch.switchState(!isTorchOn);
    setIsTorchOn(!isTorchOn);
    console.log(isTorchOn);
  };

  useEffect(() => {
    const onValueChange = database()
      .ref('/band/forkingandcountry')
      .on('value', snapshot => {
        switch (snapshot.val().key) {
          case 'G9':
            Torch.switchState(true);
            setIsTorchOn(true);
            console.log('on');
            break;
          case 'F#9':
            Torch.switchState(false);
            setIsTorchOn(false);
            console.log('off');
            break;
        }
      });

    // Stop listening for updates when no longer required
    return () =>
      database().ref('/band/forkingandcountry').off('value', onValueChange);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={styles.image}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={handlePress}>
            <Text style={styles.buttonTextStyle}>
              {isTorchOn ? 'Turn off flashlight' : 'Turn on flashlight'}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#a2ae9d',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    justifyContent: 'center',
    height: '105%',
    top: -40,
  },
});

export default App;
