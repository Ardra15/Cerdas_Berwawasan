// Previous VideoScreen component
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function Video() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Updated video data with YouTube video IDs
  const videos = [
    { 
      id: 1, 
      title: 'Pengantar Kuliah',
      youtubeId: 'vtPkouMKp2I' // Replace with your actual YouTube video IDs
    },
    { 
      id: 2, 
      title: 'Kebahasaan',
      youtubeId: 'rDo2-cnGoL0'
    },
    { 
      id: 3, 
      title: 'Penulisan Karya Ilmiah',
      youtubeId: 'FZXn-XqaZGk'
    },
    { 
      id: 4, 
      title: 'Ejaan Bahasa Indonesia',
      youtubeId: 'aKjOcklsxL8'
    },
    { 
      id: 5, 
      title: 'Penulisan Huruf',
      youtubeId: 'iBD-zpM4nak'
    },
    { 
      id: 6, 
      title: 'Pemakaian Huruf Kapital',
      youtubeId: 'hjpT8gP_4js'
    },
    { 
      id: 7, 
      title: 'Pemakaian Huruf Miring dan Huruf Tebal ',
      youtubeId: 'TBBBm8a62mE'
    },
    { 
      id: 8, 
      title: 'Penulisan Imbuhan, Kata Depan, Partikel Per dan Pun',
      youtubeId: 'Oi8xSvDCZ7w'
    },
    { 
      id: 9, 
      title: 'Penulisan Kata',
      youtubeId: 'jdLuv8clJiQ'
    },
    { 
      id: 10, 
      title: 'Penulisan Kalimat Majemuk, Kata Ulang, Angka & Bilangan',
      youtubeId: 'Cm-lw9RbKxQ'
    },
  ];

  // Filter videos based on search query
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Videos</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search.."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.videoList}>
        {filteredVideos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoCard}>
            <View style={styles.thumbnailContainer}>
              <YoutubePlayer
                height={200}
                videoId={video.youtubeId}
                play={false}
                webViewProps={{
                  androidLayerType: 'hardware',
                }}
              />
            </View>
            <Text style={styles.videoTitle}>{video.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (same styles as before)
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  videoList: {
    padding: 16,
  },
  videoCard: {
    marginBottom: 16,
  },
  thumbnailContainer: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});