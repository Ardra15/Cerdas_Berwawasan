import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { auth, database } from '../firebaseConfig';
import { ref, set, get } from 'firebase/database';
import { useRouter } from 'expo-router';

const questions = [
  { word: 'Kedaluarsa', isCorrect: false, correctAnswer: 'Kadaluarsa', answerType: 'Tidak Baku' },
  { word: 'Junior', isCorrect: true, correctAnswer: 'Junior', answerType: 'Baku' },
  { word: 'Obyek', isCorrect: false, correctAnswer: 'Objek', answerType: 'Tidak Baku' },
  { word: 'Sekedar', isCorrect: false, correctAnswer: 'Sekadar', answerType: 'Tidak Baku' },
  { word: 'Seksama', isCorrect: false, correctAnswer: 'Saksama', answerType: 'Tidak Baku' },
  { word: 'Indra', isCorrect: true, correctAnswer: 'Indra', answerType: 'Baku' },
  { word: 'Cidera', isCorrect: false, correctAnswer: 'Cedera', answerType: 'Tidak Baku' },
  { word: 'Ijasah', isCorrect: false, correctAnswer: 'Ijazah', answerType: 'Tidak Baku' },
  { word: 'Manajemen', isCorrect: true, correctAnswer: 'Manajemen', answerType: 'Baku' },
  { word: 'Coklat', isCorrect: false, correctAnswer: 'Cokelat', answerType: 'Tidak Baku' },
  { word: 'Apotik', isCorrect: false, correctAnswer: 'Apotek', answerType: 'Tidak Baku' },
  { word: 'Antre', isCorrect: false, correctAnswer: 'Anter', answerType: 'Tidak Baku' },
  { word: 'Desain', isCorrect: true, correctAnswer: 'Desain', answerType: 'Baku' },
  { word: 'Lembab', isCorrect: false, correctAnswer: 'Lembab', answerType: 'Tidak Baku' },
  { word: 'Respons', isCorrect: true, correctAnswer: 'Respons', answerType: 'Baku' },
  { word: 'Bis', isCorrect: false, correctAnswer: 'Bus', answerType: 'Tidak Baku' },
  { word: 'Teknologi', isCorrect: true, correctAnswer: 'Teknologi', answerType: 'Baku' },
  { word: 'Detil', isCorrect: false, correctAnswer: 'Detail', answerType: 'Tidak Baku' },
  { word: 'Capek', isCorrect: false, correctAnswer: 'Capek', answerType: 'Tidak Baku' },
  { word: 'Diagnosis', isCorrect: true, correctAnswer: 'Diagnosis', answerType: 'Baku' },
];

export default function Games() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const progressRef = ref(database, `users/${userId}/progress`);
      const snapshot = await get(progressRef);
      if (snapshot.exists()) {
        const progress = snapshot.val();
        setScore(progress.score);
        setAnsweredQuestions(progress.answeredQuestions || []);
      }
    }
  };

  const handleAnswer = async (isBaku: boolean) => {
    const question = questions[currentQuestion];
    const isCorrect = isBaku === question.isCorrect;

    if (!answeredQuestions.includes(currentQuestion)) {
      if (isCorrect) {
        setScore(prev => prev + 5);
        Alert.alert('Benar!', `Kata yang benar adalah: ${question.correctAnswer}`);
      } else {
        Alert.alert('Salah!', `Kata yang benar adalah: ${question.correctAnswer}`);
      }
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);

      const userId = auth.currentUser?.uid;
      if (userId) {
        await set(ref(database, `users/${userId}/progress`), {
          score: score + (isCorrect ? 5 : 0),
          answeredQuestions: [...answeredQuestions, currentQuestion],
        });
      }
    }
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const resetProgress = async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      try {
        // Reset the user's progress in the database
        await set(ref(database, `users/${userId}/progress`), {
          score: 0,
          answeredQuestions: [],
        });

        // Wait for the database operation to complete before updating state
        setScore(0);
        setAnsweredQuestions([]);
        setCurrentQuestion(0); // Reset to the first question

        // Show alert after resetting
        Alert.alert('Progress Reset', 'Your progress has been reset successfully.', [
          { text: 'OK', onPress: () => loadProgress() }, // Refresh data after reset
        ]);
      } catch (error) {
        console.error('Error resetting progress:', error);
        Alert.alert('Error', 'There was an error resetting your progress. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tebak Kata</Text>
      
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(currentQuestion + 1) * (100 / questions.length)}%` }]} />
      </View>

      <View style={styles.grid}>
        {Array.from({ length: 20 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.gridItem,
              index <= currentQuestion && styles.gridItemActive,
              index === currentQuestion && styles.gridItemCurrent,
              answeredQuestions.includes(index) && styles.gridItemAnswered,
            ]}
            onPress={() => setCurrentQuestion(index)}
            disabled={index >= questions.length}
          >
            <Text style={styles.gridText}>
              {index < questions.length ? index + 1 : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.wordContainer}>
          <Text style={styles.word}>{questions[currentQuestion]?.word}</Text>
        </View>

        <Text style={styles.points}>Point: {score}/100</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.buttonBaku}
            onPress={() => handleAnswer(true)}
            disabled={answeredQuestions.includes(currentQuestion)}
          >
            <Text style={styles.buttonBakuText}>Baku</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonTidakBaku}
            onPress={() => handleAnswer(false)}
            disabled={answeredQuestions.includes(currentQuestion)}
          >
            <Text style={styles.buttonTidakBakuText}>Tidak Baku</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.buttonKembali, { opacity: currentQuestion === 0 ? 0.5 : 1 }]}
            onPress={() => handleNavigation('prev')}
            disabled={currentQuestion === 0}
          >
            <Text style={styles.buttonKembaliText}>Kembali</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.buttonLanjut, { opacity: currentQuestion === questions.length - 1 ? 0.5 : 1 }]}
            onPress={() => handleNavigation('next')}
            disabled={currentQuestion === questions.length - 1}
          >
            <Text style={styles.buttonLanjutText}>Lanjut</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.resetButton}
          onPress={resetProgress}
        >
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 24,
  },
  progress: {
    width: '20%',
    height: '100%',
    backgroundColor: '#40E0D0',
    borderRadius: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  gridItem: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  gridItemActive: {
    backgroundColor: '#F0F0F0',
  },
  gridItemCurrent: {
    backgroundColor: '#FF0000',
  },
  gridItemAnswered: {
    backgroundColor: '#4CAF50',
  },
  gridText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#0047AB',
    borderRadius: 16,
    padding: 16,
  },
  wordContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  points: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonBaku: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '48%',
  },
  buttonTidakBaku: {
    backgroundColor: '#FFf',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '48%',
  },
  buttonBakuText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTidakBakuText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonKembali: {
    backgroundColor: '#40E0D0',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '48%',
  },
  buttonLanjut: {
    backgroundColor: '#40E0D0',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '48%',
  },
  buttonKembaliText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLanjutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});