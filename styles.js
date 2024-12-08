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
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16,

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
    color: 'white',
    
  },
  titleSignup: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
   }, 
   buttonContainer: { 
    marginVertical: 16, 
  }, 
  subtitle: { 
    fontSize: 18, 
    marginVertical: 8, 
    color: 'white',
  }, 
  input: { 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    paddingHorizontal: 8, 
    width: '80%', 
    marginBottom: 16, 
    color: 'white',
  }, 
  resultContainer: { 
    marginTop: 16, 
    alignItems: 'center', 
    color: 'white',
  }, 
  
});
