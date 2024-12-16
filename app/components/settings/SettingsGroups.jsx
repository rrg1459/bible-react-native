import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import { useDispatch } from 'react-redux';
import { changeType } from '../../redux/quoteSlice';
import getTypeNames from '../../utils/getTypeNames.js';
import types from '../../bible/types.js';

const SettingsGroups = ({ language, type_id }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const names = getTypeNames({ language, types });
    setItems(names);
    setSelectedValue(names.find((n) => n.key === type_id).value);
  }, [language]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const onSelect = (key) => dispatch(changeType(key));

  const handleItemSelect = (item) => {
    setSelectedValue(item.value);
    setIsOpen(false);
    onSelect(item.key);
  };


  return (
    <View>
      <Text style={styles.label}>
        {language ? 'Grupos de libros' : 'Book groups'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.textButton}>{selectedValue || 'Select an option'}</Text>
        {isOpen ?
          <Image
            source={require("../../images/double-arrow.png")}
            style={styles.image}
          /> :
          <Image
            source={require("../../images/arrow.png")}
            style={styles.image}
          />
        }
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.items}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemSelect(item)}>
                <Text style={[styles.itemValue, item.key === type_id ? styles.currentGroup : '']}>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default SettingsGroups

const styles = StyleSheet.create({
  label: {
    color: '#000000', fontSize: 25,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 8,
    margin: 15,
    elevation: 6,
    justifyContent: 'space-between',
    backgroundColor: '#FCFCFD',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  textButton: {
    fontSize: 22,
    lineHeight: 51,
    fontWeight: 'light',
    letterSpacing: 1.25,
    color: '#36395A',
  },
  items: {
    marginHorizontal: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#e2e2e3',
    borderWidth: 2,
    maxHeight: 150,
    backgroundColor: '#ededf3',
  },
  itemValue: {
    fontSize: 18,
    color: '#5E5E61',
  },
  currentGroup: {
    color: '#000000',
    fontWeight: '500',
  },
  image: {
    marginLeft: 20,
    width: 20,
    height: 20,
  },
});