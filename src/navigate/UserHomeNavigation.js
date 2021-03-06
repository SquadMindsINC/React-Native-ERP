// ======================================================== user navigation and logout =====================================================
import React from 'react';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Alert, SafeAreaView, Text, View, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

import UserHomeScreen from '../screens/UserHomeScreen';
import UserProfile from '../screens/UserProfile';
import UserProjectList from '../screens/UserProjectList';
import UserList from '../screens/UserList';

// this component are used for drawer navigation (side menu)
const Drawer = createDrawerNavigator();
const CustomDrawer = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={({color}) => (
          <View style={{flexDirection: 'row'}}>
            <MaterialIcons
              name="logout"
              size={30}
              color={color ? 'orange' : '#A9A9A9'}
            />
            <Text style={styles.logoutContainer}>Logout</Text>
          </View>
        )}
        onPress={() => {
          props.navigation.toggleDrawer();
          Alert.alert(
            'Logout',
            'Are you sure? You want to logout',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  return null;
                },
              },
              {
                text: 'Confirm',
                onPress: () => {
                  auth()
                    .signOut()
                    .then(() => {
                      // AsyncStorage.clear();
                      props.navigation.replace('Login');
                    })
                    .catch(error => {
                      console.log(error);
                      if (error.code === 'auth/no-current-user') {
                        props.navigation.replace('Login');
                      } else {
                        Alert.alert(error);
                      }
                    });
                },
              },
            ],
            {cancelable: false},
          );
        }}
      />
    </SafeAreaView>
  );
};

// main component
export default function HomePage() {
  return (
    <Drawer.Navigator
      initialRouteName="UserHome"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="UserHome"
        component={UserHomeScreen}
        options={{
          title: 'Home',
          headerShown: true,
          drawerIcon: ({focused}) => (
            <MaterialIcons
              name="home"
              size={30}
              color={focused ? '#307ecc' : '#A9A9A9'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={UserProfile}
        options={{
          title: 'Profile',
          headerShown: true,
          drawerIcon: ({focused}) => (
            <MaterialIcons
              name="person"
              size={30}
              color={focused ? '#307ecc' : '#A9A9A9'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Project"
        component={UserProjectList}
        options={{
          title: 'Projects',
          headerShown: true,
          drawerIcon: ({focused}) => (
            <MaterialIcons
              name="code"
              size={30}
              color={focused ? '#307ecc' : '#A9A9A9'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AllUser"
        component={UserList}
        options={{
          title: 'Users',
          headerShown: true,
          drawerIcon: ({focused}) => (
            <MaterialIcons
              name="group"
              size={30}
              color={focused ? '#307ecc' : '#A9A9A9'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    color: 'orange',
    fontWeight: '500',
    paddingLeft: 30,
    paddingTop: 4,
  },
});
