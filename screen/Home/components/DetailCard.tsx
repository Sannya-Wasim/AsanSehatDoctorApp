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
import Icons from './Icons';

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
          <Icons />
        </>
      )}
    </View>
  );
};

export default DetailCard;

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
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
