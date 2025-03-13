import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface PostCardProps {
  avatar: string;
  username: string;
  time: string;
  product: string;
  rating: number;
  ratingColor: string;
  image?: string;
  likes: number;
  comments: number;
  content: string;
}

export default function PostCard({
  avatar,
  username,
  time,
  product,
  rating,
  ratingColor,
  image,
  likes,
  comments,
  content,
}: PostCardProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: avatar }} 
            style={styles.avatar}
          />
          <View>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.product}>{product}</Text>
          <View style={[styles.ratingBadge, { backgroundColor: ratingColor }]}>
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.content}>{content}</Text>

      {/* Image if exists */}
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.contentImage}
          resizeMode="cover"
        />
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionCount}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  product: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
    lineHeight: 24,
  },
  contentImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  actionCount: {
    fontSize: 14,
    color: '#666',
  },
}); 