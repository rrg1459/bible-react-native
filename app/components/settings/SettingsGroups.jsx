import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import { useDispatch } from 'react-redux';
import { changeType } from '../../redux/quoteSlice';
import getTypeNames from '../../utils/getTypeNames.js';
import types from '../../bible/types.js';
import { Storage } from '../../utils/storage';
import { KEY } from '../../constants/storageKeys';

const SettingsGroups = ({ language, type_id }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const names = getTypeNames({ types });
    setItems(names);
    setSelectedValue(names.find((n) => n.key === type_id).value[language]);
  }, [language]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const saveTypeID = async (key) => {
    try {
      await Storage.setItem(KEY.TypeID, key);
    } catch (error) {
      console.error('Failed to save type ID:', error);
    }
  };

  const onSelect = (key) => {
    dispatch(changeType(key));
    saveTypeID(key);
  };

  const handleItemSelect = (item) => {
    setSelectedValue(item.value[language]);
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
            style={styles.imageDobleArrow}
          /> :
          <Image
            source={require("../../images/arrow.png")}
            style={styles.imageArrow}
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
                <Text style={[styles.itemValue, item.key === type_id ? styles.currentGroup : '']}>
                  {item.value[language]}
                </Text>
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
    marginTop: 15,
    marginBottom: 5,
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
    maxHeight: 165,
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
  imageArrow: {
    marginLeft: 20,
    width: 17,
    height: 17,
  },
  imageDobleArrow: {
    marginLeft: 20,
    width: 15,
    height: 15,
  },
});
