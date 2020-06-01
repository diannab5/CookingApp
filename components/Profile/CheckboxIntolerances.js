import React, {useCallback, useContext} from 'react';
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import { StorageContext } from '../../contexts/storageContext';
//import { onSelect } from '../helpers/onSelect';

const DATA = [
  {
    id: 'Dairy',
    title: 'Dairy',
  },
  {
    id: 'Egg',
    title: 'Egg',
  },
  {
    id: 'Gluten',
    title: 'Gluten',
  },
  {
    id: 'Grain',
    title: 'Grain',
  },
  {
    id: 'Seafood',
    title: 'Seafood',
  },
  {
    id: 'Shellfish',
    title: 'Shellfish',
  },
  {
    id: 'Sesame',
    title: 'Sesame',
  },
  {
    id: 'Sulfite',
    title: 'Sulfite',
  },
  {
    id: 'Soy',
    title: 'Soy',
  },
  {
    id: 'Wheat',
    title: 'Wheat',
  },
  {
    id: 'Tree nut',
    title: 'Tree nut',
  },
  {
    id: 'Peanut',
    title: 'Peanut',
  },
  
];
const obj = {}

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#808080' : '#bebebe'},
      ]}
    >
      <Text style={styles.title, {color: selected ? 'white' : 'black', alignSelf:'center'}}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App(props) {
  const selected = props.state[0]
  const setSelected = props.state[1]
  const [state, setState] = useContext(StorageContext);

  const onSelect = useCallback(
    id => { 
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);

      for (let key of selected.keys()) {
        obj[key] = selected.get(key);
      };
      const filtered = Object.entries(obj).filter((x) => x[1]);
      const results = (filtered.map(x=> (x[0])));
      setState(state => ({...state, intolerances:results}));
    },
    [selected],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ alignSelf:'center', color:'white', fontSize:20,textShadowOffset:{width:-1, height:1}, textShadowColor:'rgba(0, 0, 0, 1)',textShadowRadius: 10}}>
                Select dietary intolerances
      </Text>
      <FlatList
        horizontal={false}
        style={{alignSelf:'center', flexGrow:0, marginVertical:5}}

        numColumns={3}
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
            titleStyle={{color: selected ? 'white' : 'black', textAlign: 'center'}}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    width: '80%',
    alignSelf: 'center'
  },
  item: {
    padding: 5,
    marginVertical: 7,
    marginHorizontal:5,
    borderRadius:5,
    paddingVertical:12,
    width:'30%',
  },
  title: {
    fontSize: 12,
  },
  intolerance:{
    color:'red'
  }
});
