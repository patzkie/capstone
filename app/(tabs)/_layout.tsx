import { icons } from '@/constants/icon';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#040512',
          height: 78,
          borderRadius: 40,
          marginHorizontal: 2, // controls pill length
          marginBottom: 60,
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
        },

        tabBarItemStyle: {
          borderRadius: 35,
          marginVertical: 10,
        },

        tabBarShowLabel: false,
      }}
    >
      {/* Toll cal */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                transform: [{ translateY: focused ? -6 : 0 }],
              }}
            >
              <Image
                source={focused ? icons.pressCal : icons.cal}
                style={{
                  width: 38,          // adjust as needed
                  height: 38,
                  resizeMode: 'contain',
                }}
              />

              <Text
                numberOfLines={1}
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                  width: 90,
                  lineHeight: 18,
                  color: focused ? '#1EC9FF' : '#8FAED6',
                }}
              >
                Toll Cal
              </Text>
            </View>
          ),
        }}
      />

      {/* history */}
      <Tabs.Screen
        name="history"
        options={{
          href: null, // 👈 hides from tab bar
        }}
      />



      {/* saved */}
      <Tabs.Screen
        name="saved"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                transform: [{ translateY: focused ? -6 : 0 }],
              }}
            >
              <Image
                source={focused ? icons.pressSave : icons.save}
                style={{
                  width: 38,
                  height: 38,
                  resizeMode: 'contain',
                }}
              />

              <Text
                numberOfLines={1}
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                  width: 90,
                  lineHeight: 18,
                  color: focused ? '#1EC9FF' : '#8FAED6',
                }}
              >
                Saved
              </Text>
            </View>
          ),
        }}
      />

      {/* navigate */}
      <Tabs.Screen
        name="navigate"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                transform: [{ translateY: focused ? -6 : 0 }],
              }}
            >
              <Image
                source={focused ? icons.press_navigate : icons.navigate}
                style={{
                  width: 38,
                  height: 38,
                  resizeMode: 'contain',
                }}
              />

              <Text
                numberOfLines={1}
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                  width: 90,
                  lineHeight: 18,
                  color: focused ? '#1EC9FF' : '#8FAED6',
                }}
              >
                Navigate
              </Text>
            </View>
          ),
        }}
      />


      {/* estimate */}
      <Tabs.Screen
        name="estimate"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                transform: [{ translateY: focused ? -6 : 0 }],
              }}
            >
              <Image
                source={focused ? icons.press_estimate : icons.estimate}
                style={{
                  width: 38,
                  height: 38,
                  resizeMode: 'contain',
                }}
              />

              <Text
                numberOfLines={1}
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                  width: 90,
                  lineHeight: 18,
                  color: focused ? '#1EC9FF' : '#8FAED6',
                }}
              >
                Estimate
              </Text>
            </View>
          ),
        }}
      />

      {/* rfid */}
      <Tabs.Screen
        name="rfid"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                transform: [{ translateY: focused ? -6 : 0 }],
              }}
            >
              <Image
                source={focused ? icons.press_rfid : icons.rfid}
                style={{
                  width: 38,
                  height: 38,
                  resizeMode: 'contain',
                }}
              />

              <Text
                numberOfLines={1}
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                  width: 90,
                  lineHeight: 18,
                  color: focused ? '#1EC9FF' : '#8FAED6',
                }}
              >
                RFID
              </Text>
            </View>
          ),
        }}
      />

    </Tabs>
  );
};

export default _layout;
