import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'netflix', label: 'Netflix' },
  { id: 'streaming', label: 'Streaming' },
  { id: 'apple-vision-pro', label: 'Vision Pro' },
  { id: 'pilates', label: 'Pilates' },
];

export default function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tab,
            activeTab === category.id && styles.activeTab
          ]}
          onPress={() => onTabChange(category.id)}
        >
          <Text style={[
            styles.tabText,
            activeTab === category.id && styles.activeTabText
          ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#4F46E5',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
}); 