import { useEffect, useState } from 'react';
import { FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useFocusEffect } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { changeScreen } from '../redux/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import fillVerses from '../utils/fillVerses';
import versesAbbs from '../utils/versesAbbs';
import Verse from "../components/Verse.jsx";

const ComponentVerses = () => {

  const languageValue = useSelector(state => state.quote.language);
  const numVerses = useSelector(state => state.quote.numVerses);
  const book = useSelector(state => state.quote.book);
  const chapter = useSelector(state => state.quote.numChapter);
  const dispatch = useDispatch();
  const route = useRoute();
  const ScreenName = route.name;
  const [verses, setVerses] = useState([]);
  const [verseAbbs, setVerseAbbs] = useState('');
  const [bible, setBible] = useState('');

  useEffect(() => {
    setVerseAbbs(versesAbbs({ numVerses: numVerses, language: languageValue }));
  }, [numVerses]);

  useEffect(() => {
    setVerses(fillVerses({ book_id: book.id, chapter: chapter }));
  }, [chapter, book]);

  useEffect(() => {
    setBible(languageValue ? 'Santa Biblia Reina Valera' : 'Holy Bible King James Version');
  }, [languageValue]);

  useFocusEffect(() => {
    dispatch(changeScreen(ScreenName));
  });

  const handleShare = async () => {
    let quote = `${bible}\n`;
    quote += `${book.name[languageValue]} ${chapter}${verseAbbs}`;
    for (const num of numVerses) {
      const text = verses.find((item) => item.verse === num).text;
      const before = numVerses.length > 1 ? `\n${num}. ` : '\n';
      quote += before + text[languageValue];
    };
    try {
      await Share.share({
        message: quote
      });
    } catch (error) {
      console.error('Error sharing:', error);
    };
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerBible}>{bible}</Text>
          <Text style={styles.headerBook}>
            {book.name[languageValue]}
          </Text>
          <View style={styles.headerQuote}>
            <Text style={styles.headerChapter}>
              {chapter}
            </Text>
            <Text style={styles.headerAbbs}>{verseAbbs}</Text>
          </View>
        </View>
        {verseAbbs !== '' &&
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={handleShare}>
              <Image
                source={require("../images/share.png")}
                style={styles.headerImages}
              />
            </TouchableOpacity>
          </View>
        }
      </View>

      <View style={styles.verses}>
        <FlatList
          data={verses}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Verse verse={item} />}
          keyExtractor={(verse) => String(verse.id)}
        />
      </View>
    </View>
  );
};
export default ComponentVerses

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  header: {
    backgroundColor: '#7dfcd2',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 3,
  },
  headerRight: {
    flex: 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-end',
  },
  headerImages: {
    height: 35,
    width: 35,
    marginRight: 30,
  },
  headerBible: {
    fontSize: 13,
    paddingTop: 5,
  },
  headerBook: {
    fontSize: 25,
  },
  headerQuote: {
    flexDirection: 'row',
    alignContent: 'space-between', // Align to the left
  },
  headerChapter: {
    width: 'auto',
    fontWeight: '500',
    paddingBottom: 5,
    fontSize: 16,
  },
  headerAbbs: {
    flex: 1,
    paddingTop: 1,
    paddingBottom: 5,
    fontSize: 15,
  },
  verses: {
    cursor: "pointer",
    paddingBottom: 100,
  },
});
