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
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5, // Add spacing between buttons if React Native supports 'gap'
    // fd9a25
  },
  authButtonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 20, 
    gap: 10, },

  container: {
    flex: 1,
    backgroundColor: '#4e4e4e', 
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },

  titleSignup:{
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  input: {
    width: '50%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#fd9a25',
    borderRadius: 4,
    justifyContent: 'center',
    
  },
  
});
