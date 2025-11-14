import { FlatList, Text, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { GRAY, LIGHT_GRAY } from '../../../../util/color';

const RecordCard = ({ record, index }: any) => {
  return (
    <View style={styles?.container} key={index}>
      {/*Header  */}
      <View style={styles?.header}>
        <View>
          <Text>{record?.nextFollowupDate}</Text>
          <Text>{record?.doctorName}</Text>
        </View>
        <View>
          <Text>Booked for</Text>
          <Text>{record?.patientName}</Text>
        </View>
      </View>
      {/* Prescriptions */}
      <FlatList
        data={record?.prescriptions}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: LIGHT_GRAY,
                margin: scale(2),
                padding: scale(5),
                borderRadius: scale(5),
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <Text>{item?.medicineName}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginHorizontal: scale(10) }}>
                  {item?.quantity}
                </Text>
                <Text>|</Text>
                <Text style={{ marginHorizontal: scale(10) }}>
                  {item?.remarks}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Text style={{ fontWeight: 'bold', marginVertical: scale(10) }}>
        Symptoms
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {record?.symptoms?.map(( r: string, index: number ) => {
          return (
            <Text
              key={index}
              style={{
                backgroundColor: LIGHT_GRAY,
                paddingHorizontal: scale(10),
                paddingVertical: scale(2),
                borderRadius: scale(5),
                margin: scale(2),
              }}
            >
              {r}
            </Text>
          );
        })}
      </View>
      {record?.instructions && (
        <>
          {' '}
          <Text style={{ fontWeight: 'bold', marginVertical: scale(5) }}>
            Instructions
          </Text>
          <Text style={{ marginVertical: scale(10), textAlign: 'left' }}>
            {record?.instructions}
          </Text>
        </>
      )}
      <Text style={{ fontWeight: 'bold', marginVertical: scale(5) }}>
        Lab Test
      </Text>
      {record?.labTests?.map(
        ( lbt: string, index: number ) => {
          return (
            <Text
              key={index}
              style={{
                margin: scale(2),
              }}
            >
              {lbt}
            </Text>
          );
        },
      )}
    </View>
  );
};

export default RecordCard;

const styles = ScaledSheet?.create({
  container: {
    borderWidth: 1,
    borderColor: GRAY,
    margin: scale(5),
    borderRadius: scale(5),
    padding: scale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
    marginBottom: scale(10),
    padding: scale(5),
  },
});
