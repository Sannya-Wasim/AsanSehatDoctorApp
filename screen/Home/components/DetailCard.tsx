import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { useApi } from '../../../methods/apiClient';
import { endpoints } from '../../../methods/endpoints';
import { RED_COLOR, WHITE, BLACK } from '../../../util/color';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const DetailCard = () => {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState({});
  const user = useSelector((state: RootState) => state?.auth?.user);
  const { POST } = useApi();

  const fetchDoctorDetails = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append('id', user?.id);
      const res = await POST(endpoints?.fetchDetails, formdata);
      if (res?.status) {
        // console.log("Successfully fetched doctor's details", res?.data);
        setDoctor(res?.data);
      } else {
        console.log("Failed to fetch doctor's details", res?.message);
      }
    } catch (error) {
      console.log("Error fetching doctor's details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color={WHITE} />
      ) : (
        <>
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.doctorName}>{doctor?.name}</Text>
              <Text style={styles.doctorDesignation}>{user?.designation}</Text>
              <View style={styles.degreeContainer}>
                {doctor?.degrees?.map((deg: { degreeName: string }, index) => (
                  <Text key={index} style={styles.degreeText}>
                    {deg?.degreeName}
                  </Text>
                ))}
              </View>
            </View>

            <Image
              source={{ uri: doctor?.profile_picture }}
              style={styles.image}
            />
          </View>

          {/* Icons */}
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
                <MaterialIcon
                  name="payments"
                  size={scale(40)}
                  color={'#0D5495'}
                />
              </View>
              <Text style={styles.iconValue}>18,000</Text>
              <Text style={styles.iconLabel}>Earnings</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default DetailCard;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: RED_COLOR,
    flexDirection: 'row',
    padding: scale(5),
    marginTop: scale(40),
    borderRadius: scale(5),
  },
  cardLeft: {
    flexBasis: '60%',
    padding: scale(10),
  },
  doctorName: {
    color: WHITE,
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  doctorDesignation: {
    color: WHITE,
    fontSize: scale(14),
  },
  degreeContainer: {
    marginVertical: scale(15),
  },
  degreeText: {
    color: WHITE,
    fontSize: scale(10),
  },
  image: {
    width: scale(135),
    height: scale(153),
    borderRadius: scale(5),
    marginTop: -scale(40),
    right: scale(10),
  },
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
