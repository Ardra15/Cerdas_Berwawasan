// This replaces the previous HomeScreen component
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth, database } from '../firebaseConfig'; // Import auth and database
import { ref, get } from 'firebase/database';
import YoutubePlayer from 'react-native-youtube-iframe';
import BG_Carousel from '../../assets/images/bg_carousel.png'

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserName(userData.name); // Set the user's name
        }
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => router.replace('/(auth)/login'),
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, {userName || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>{userName ? userName.charAt(0) : 'U'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search.."
            placeholderTextColor="#666"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gamesScroll}>
          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={BG_Carousel}
              style={styles.gameCardBackground}
              resizeMode="cover"
            />
            <View style={styles.gameContent}>
              <Text style={styles.gameTitle}>Tebak Kata Baku</Text>
              <Text style={styles.gameSubtitle}>
                Asah kemampuan pengetahuan kata bakumu!
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={() => router.push('/(tabs)/games')}>
                <Text style={styles.startButtonText}>Mulai</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={BG_Carousel}
              style={styles.gameCardBackground}
              resizeMode="cover"
            />
            <View style={styles.gameContent}>
              <Text style={styles.gameTitle}>KBBI</Text>
              <Text style={styles.gameSubtitle}>
                Tambah kosakatamu dengan buka website KBBI
              </Text>
              <TouchableOpacity style={styles.startButton} onPress={() => router.push('/(tabs)/kbbi')} >
                <Text style={styles.startButtonText}>Mulai</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Videos</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/video')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.videoList}>
            <TouchableOpacity style={styles.videoCard}>
              <YoutubePlayer
                height={200}
                play={false}
                videoId="vtPkouMKp2I"
                webViewProps={{
                  androidLayerType: 'hardware',
                }}
              />
              <Text style={styles.videoTitle}>Pengantar Perkuliahan</Text>
              <Text style={styles.videoDescription}>Tata Tulis Karya Ilmiah</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.videoCard}>
              <YoutubePlayer
                height={200}
                play={false}
                videoId="rDo2-cnGoL0"
                webViewProps={{
                  androidLayerType: 'hardware',
                }}
              />
              <Text style={styles.videoTitle}>Materi Kebahasaan</Text>
              <Text style={styles.videoDescription}>Tata Tulis Karya Ilmiah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  gameCard: {
    position: 'relative',
    width: 300,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
  },
  gameCardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },
  gameContent: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 8,
    padding: 10,
  },
  gameTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gameSubtitle: {
    color: '#fff',
    opacity: 0.8,
    marginBottom: 8,
  },
  gameIcon: {
    width: 60,
    height: 60,
  },
  startButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#0047AB',
  },
  videoList: {
    padding: 16,
  },
  videoCard: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#002B7F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gamesScroll: {
    paddingHorizontal: 16,
  },
});