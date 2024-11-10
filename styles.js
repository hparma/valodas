import { StyleSheet, Dimensions } from 'react-native';

const{width,height}=Dimensions.get("window")

export const styles = StyleSheet.create({
imageBackground: {
    width: width, // Full screen width
    height: height / 2, // 1/3 of the screen height
    justifyContent: 'center', // Center content vertically within the image
    alignItems: 'center', // Center content horizontally within the image
},
  greeting: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the buttons together
    marginBottom: 20,
    gap: 10, // Add spacing between buttons if React Native supports 'gap'
    // fd9a25
  },
  
  container: {
    flex: 1,
    backgroundColor: '#4e4e4e', // Set a background color if you want
  },
});
