import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
  activeTab: 'home' | 'explore' | 'create' | 'profile';
}

export default function BottomNavigation({ activeTab }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={[styles.icon, activeTab === 'home' && styles.activeIcon]}>🏠</Text>
        <Text style={[styles.label, activeTab === 'home' && styles.activeLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Explore')}
      >
        <Text style={[styles.icon, activeTab === 'explore' && styles.activeIcon]}>🔍</Text>
        <Text style={[styles.label, activeTab === 'explore' && styles.activeLabel]}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Create')}
      >
        <Text style={[styles.icon, activeTab === 'create' && styles.activeIcon]}>➕</Text>
        <Text style={[styles.label, activeTab === 'create' && styles.activeLabel]}>Create</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={[styles.icon, activeTab === 'profile' && styles.activeIcon]}>👤</Text>
        <Text style={[styles.label, activeTab === 'profile' && styles.activeLabel]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
    color: '#666',
  },
  activeIcon: {
    color: '#4F46E5',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  activeLabel: {
    color: '#4F46E5',
  },
}); 