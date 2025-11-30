// ReviewCard.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale } from 'react-native-size-matters';

const ReviewCard = ({ patientName, profilePicture, rating, comment, date }:any) => {
  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        borderRadius: scale(12),
        padding: scale(15),
        marginVertical: scale(10),
      }}
    >
      {/* Top Row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: profilePicture }}
            style={{
              width: scale(45),
              height: scale(45),
              borderRadius: scale(50),
              marginRight: scale(10),
            }}
          />

          <View>
            <Text
              style={{
                fontSize: scale(15),
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              {patientName}
            </Text>

            {/* Rating stars */}
            <View style={{ flexDirection: 'row', marginTop: scale(3) }}>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Icon
                  key={i}
                  name="star"
                  size={14}
                  color={i < Number(rating) ? '#f4b400' : '#ccc'}
                  style={{ marginRight: 2 }}
                />
              ))}
            </View>
          </View>
        </View>

        <Text style={{ color: '#777', fontSize: scale(12) }}>{date}</Text>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: '#C8C8C8',
          marginVertical: scale(10),
        }}
      />

      {/* Comment */}
      <Text style={{ color: '#333', fontSize: scale(14), lineHeight: 20 }}>
        {comment}
      </Text>
    </View>
  );
};

export default ReviewCard;
