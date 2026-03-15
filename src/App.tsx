import React, {useState, useEffect, useCallback, useRef} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SDKProvider, iconRegistry, SVGIconProvider, setLocale} from '@attar/enterprise-module-sdk';

// Register Material Design SVG icons (requires react-native-svg)
iconRegistry.registerProvider(new SVGIconProvider());

import {weConnectTokens, brand} from './theme';
import {createMockJwt} from './helpers/mockJwt';


import {LoginScreen} from './screens/LoginScreen';
import {HomeScreen} from './screens/HomeScreen';
import {ModuleScreen} from './screens/ModuleScreen';
import {AccountScreen} from './screens/AccountScreen';
import {SettingsScreen} from './screens/SettingsScreen';

// Production backend
const SDK_BACKEND_URL = 'https://api.miniapps.work';

type RootStackParamList = {
  Tabs: undefined;
  Module: {moduleId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator({
  msisdn,
  tier,
  locale,
  onTierChange,
  onLocaleChange,
  onLogout,
}: {
  msisdn: string;
  tier: string;
  locale: string;
  onTierChange: (tier: string) => void;
  onLocaleChange: (locale: string) => void;
  onLogout: () => void;
}): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: brand.purple,
        tabBarInactiveTintColor: brand.textSecondary,
        tabBarStyle: {
          backgroundColor: brand.white,
          borderTopColor: brand.border,
        },
        headerStyle: {backgroundColor: brand.purple},
        headerTintColor: brand.white,
        headerTitleStyle: {fontWeight: '700'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'WeConnect',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Account"
        options={{
          title: 'My Account',
          tabBarLabel: 'Account',
        }}>
        {() => <AccountScreen msisdn={msisdn} tier={tier} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}>
        {() => (
          <SettingsScreen
            currentTier={tier}
            currentLocale={locale}
            onTierChange={onTierChange}
            onLocaleChange={onLocaleChange}
            onLogout={onLogout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function AppNavigator({
  msisdn,
  tier,
  locale,
  jwt,
  onTierChange,
  onLocaleChange,
  onLogout,
}: {
  msisdn: string;
  tier: string;
  locale: string;
  jwt: string;
  onTierChange: (tier: string) => void;
  onLocaleChange: (locale: string) => void;
  onLogout: () => void;
}): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigationRef = useRef(navigation);
  navigationRef.current = navigation;

  const handleModuleOpen = useCallback((moduleId: string) => {
    navigationRef.current.navigate('Module', {moduleId});
  }, []);

  const handleModuleClose = useCallback(() => {
    if (navigationRef.current.canGoBack()) {
      navigationRef.current.goBack();
    }
  }, []);

  return (
    <SDKProvider
      authToken={jwt}
      tenantId="weconnect"
      userId={`user-${msisdn}`}
      apiBaseUrl={SDK_BACKEND_URL}
      moduleRegistryUrl={SDK_BACKEND_URL}
      locale={locale}
      encryptionKey="sdk-module-encryption-key-change-in-prod"
      zones={{
        actions: {
          type: 'actions',
          position: 'top',
          height: 280,
          layout: 'grid',
          columns: 3,
        },
        content: {
          type: 'fill',
          position: 'fill',
          emptyMessage: 'Select a module to get started',
        },
      }}
      designTokens={weConnectTokens}
      subscription={{tier}}
      accountIdentifier={{identifier: msisdn}}
      onModuleOpen={handleModuleOpen}
      onModuleClose={handleModuleClose}>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" options={{headerShown: false}}>
          {() => (
            <TabNavigator
              msisdn={msisdn}
              tier={tier}
              locale={locale}
              onTierChange={onTierChange}
              onLocaleChange={onLocaleChange}
              onLogout={onLogout}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Module"
          component={ModuleScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SDKProvider>
  );
}

export default function App(): React.JSX.Element {
  const [auth, setAuth] = useState<{
    msisdn: string;
    jwt: string;
  } | null>(null);
  const [tier, setTier] = useState('WeGold1000');
  const [locale, setAppLocale] = useState('en');

  // Modules come from the SDK backend — no seeding needed

  const handleLogin = useCallback(
    (msisdn: string) => {
      const jwt = createMockJwt({
        sub: `user-${msisdn}`,
        tenantId: 'weconnect',
        roles: ['subscriber'],
        msisdn,
        plan: tier,
      });
      setAuth({msisdn, jwt});
    },
    [tier],
  );

  const handleLogout = useCallback(() => {
    setAuth(null);
  }, []);

  const handleLocaleChange = useCallback((newLocale: string) => {
    setAppLocale(newLocale);
    setLocale(newLocale);
  }, []);

  const handleTierChange = useCallback(
    (newTier: string) => {
      setTier(newTier);
      // Re-generate JWT with new plan
      if (auth) {
        const jwt = createMockJwt({
          sub: `user-${auth.msisdn}`,
          tenantId: 'weconnect',
          roles: ['subscriber'],
          msisdn: auth.msisdn,
          plan: newTier,
        });
        setAuth({msisdn: auth.msisdn, jwt});
      }
    },
    [auth],
  );

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={brand.purple} />
      {auth ? (
        <AppNavigator
          msisdn={auth.msisdn}
          tier={tier}
          locale={locale}
          jwt={auth.jwt}
          onTierChange={handleTierChange}
          onLocaleChange={handleLocaleChange}
          onLogout={handleLogout}
        />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}
