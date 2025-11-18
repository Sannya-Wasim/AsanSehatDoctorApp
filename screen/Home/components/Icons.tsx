import React from 'react';
import { View, Text } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { RED_COLOR, WHITE, BLACK } from '../../../util/color';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Icons = () => {
  return (
    <View style={styles.iconRow}>
      <View style={styles.iconWrapper}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: 'rgba(238,33,37,0.3)' },
          ]}
        >
          <Icon name="video" size={scale(40)} color={RED_COLOR} />
        </View>
        <Text style={styles.iconValue}>Rs. 400</Text>
        <Text style={styles.iconLabel}>Fees</Text>
      </View>

      <View style={styles.iconWrapper}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: 'rgba(11,149,122,0.3)' },
          ]}
        >
          <Icon name="award" size={scale(40)} color={'#0B957A'} />
        </View>
        <Text style={styles.iconValue}>12 Years</Text>
        <Text style={styles.iconLabel}>Experience</Text>
      </View>

      <View style={styles.iconWrapper}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: 'rgba(233,133,3,0.3)' },
          ]}
        >
          <MaterialIcon
            name="insert-emoticon"
            size={scale(40)}
            color={'#0D5495'}
          />
        </View>
        <Text style={styles.iconValue}>175+</Text>
        <Text style={styles.iconLabel}>Patients</Text>
      </View>

      <View style={styles.iconWrapper}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: 'rgba(18,86,161,0.3)' },
          ]}
        >
          <MaterialIcon name="payments" size={scale(40)} color={'#0D5495'} />
        </View>
        <Text style={styles.iconValue}>18,000</Text>
        <Text style={styles.iconLabel}>Earnings</Text>
      </View>
    </View>
  );
};

export default Icons;

const styles = ScaledSheet.create({
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(20),
  },
  iconWrapper: {
    flex: 1,
    marginHorizontal: scale(5),
    alignItems: 'center',
  },
  iconCircle: {
    alignItems: 'center',
    padding: scale(15),
    borderRadius: scale(100),
    marginBottom: scale(5),
  },
  iconValue: {
    textAlign: 'center',
    color: BLACK,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  iconLabel: {
    textAlign: 'center',
    color: BLACK,
    fontSize: scale(8),
  },
});
