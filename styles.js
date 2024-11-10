import { StyleSheet, Dimensions } from 'react-native';

const{width,height}=Dimensions.get("window")

export const styles = StyleSheet.create({
imageBackground: {
    width: width, 
    height: height / 2, 
    justifyContent: 'center',
    alignItems: 'center', 
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
    backgroundColor: '#4e4e4e', 
  },
});
