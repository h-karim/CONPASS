import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 2,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 19,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  title: {
    fontSize: 36,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  item: {
    padding: 10,
    fontSize: 25,
    height: 44,
  },
});

export default styles;