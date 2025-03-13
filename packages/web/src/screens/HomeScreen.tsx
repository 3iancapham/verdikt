import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import PostCard from '../components/PostCard';
import CategoryTabs from '../components/CategoryTabs';
import BottomNavigation from '../components/BottomNavigation';

// Mock posts data (same as web version)
const allPosts = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    username: "Jay Russo",
    time: "4 min ago",
    product: "Nike Air Force 1",
    rating: 4.4,
    ratingColor: "#22c55e",
    image: "https://via.placeholder.com/500x300",
    likes: 124,
    comments: 124,
    content: "Just got my first pair of Nike Air Force 1s. So fresh and comfyyy",
    topics: ["sneakers", "nike"],
  },
  // ... add more posts as needed
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  // Filter posts when tab changes
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter(post => post.topics.includes(activeTab)));
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      <CategoryTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            avatar={item.avatar}
            username={item.username}
            time={item.time}
            product={item.product}
            rating={item.rating}
            ratingColor={item.ratingColor}
            image={item.image}
            likes={item.likes}
            comments={item.comments}
            content={item.content}
          />
        )}
      />
      
      <BottomNavigation activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 