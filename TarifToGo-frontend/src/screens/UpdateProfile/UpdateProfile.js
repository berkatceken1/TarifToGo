import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import styles from './stylesProfileEdit';
import Back from 'react-native-vector-icons/Ionicons';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function UpdateProfile() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [mobile, setMobile] = useState('');
  const route = useRoute();
  // const selectPhoto = () => {
  //   ImagePicker.openPicker({
  //     width: 400,
  //     height: 400,
  //     cropping: true,
  //     includeBase64: true,
  //     cropperCircleOverlay: true,
  //     avoidEmptySpaceAroundImage: true,
  //     freeStyleCropEnabled: true,
  //   }).then(image => {
  //     console.log(image);
  //     const data = `data:${image.mime};base64,${image.data}`;
  //     setImage(data);
  //   });
  // };

 
  useEffect(() => {
    const userData = route.params.data;
    setEmail(userData.email);
    setGender(userData.gender);
    // setImage(userData.image);
    setProfession(userData.profession);
    setName(userData.name);
    setMobile(userData.mobile)
  },[]);
  const updateProfile = () => { 
    const formdata = {
      name: name,
      // image,
      email,
      profession,
      mobile,
      gender
    };
    console.log(formdata);
    axios
      .post('http://192.168.1.167:5001/update-user', formdata)
      .then(res => {console.log(res.data)
        if(res.data.status=="Ok"){
          Toast.show({
        type:'success',
        text1:'Updated',
        
      })
        }
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 40}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Back name="arrow-back" size={30} style={styles.backIcon} />
          </View>
          <View style={{flex: 3}}>
            <Text style={styles.nameText}>Profili Güncelle</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={styles.camDiv}>
          <View style={styles.camIconDiv}>
            <Back name="camera" size={22} style={styles.cameraIcon} />
          </View>

          <TouchableOpacity onPress={() => selectPhoto()}>
            <Avatar.Image
              size={140}
              style={styles.avatar}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC',
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 50,
            marginHorizontal: 22,
          }}>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Kullanıcı adı</Text>
            <TextInput
              placeholder="Adınız"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChange={e => setName(e.nativeEvent.text)}
              defaultValue={name}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Eposta</Text>
            <TextInput
              editable={false}
              placeholder="Eposta adresiniz"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChange={e => setEmail(e.nativeEvent.text)}
              defaultValue={email}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Cinsiyet</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Erkek</Text>
                <RadioButton
                  value="Erkek"
                  status={gender === 'Erkek' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('Erkek');
                  }}
                />
              </View>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Kadın</Text>
                <RadioButton
                  value="Kadın"
                  status={gender === 'Kadın' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('Kadın');
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Meslek</Text>
            <TextInput
              placeholder="Meslek"
              placeholderTextColor={'#999797'}
              keyboardType="ascii-capable"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChange={e => setProfession(e.nativeEvent.text)}
              defaultValue={profession}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Telefon</Text>
            <TextInput
              placeholder="Telefon Numarası"
              placeholderTextColor={'#999797'}
              keyboardType="numeric"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChange={e => setMobile(e.nativeEvent.text)}
              defaultValue={mobile}
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => updateProfile()}
            style={styles.inBut}>
            <View>
              <Text style={styles.textSign}>Profili Güncelle</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

export default UpdateProfile;