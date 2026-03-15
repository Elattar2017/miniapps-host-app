import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {brand} from '../theme';

interface SettingsScreenProps {
  currentTier: string;
  currentLocale: string;
  onTierChange: (tier: string) => void;
  onLocaleChange: (locale: string) => void;
  onLogout: () => void;
}

const LANGUAGES = [
  {id: 'en', label: 'English', native: 'English', flag: '🇺🇸'},
  {id: 'ar', label: 'العربية', native: 'Arabic', flag: '🇸🇦'},
];

const TIERS = [
  {id: 'extra', label: 'Extra (Basic)', color: '#14B8A6'},
  {id: 'WeGold1000', label: 'We Gold 1000', color: '#F59E0B'},
  {id: 'WeGold2000', label: 'We Gold 2000', color: '#6C2BD9'},
];

export function SettingsScreen({
  currentTier,
  currentLocale,
  onTierChange,
  onLocaleChange,
  onLogout,
}: SettingsScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <Text style={styles.sectionHint}>
          Change language for SDK modules and screens
        </Text>

        {LANGUAGES.map(lang => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.tierOption,
              currentLocale === lang.id && styles.tierOptionSelected,
            ]}
            onPress={() => onLocaleChange(lang.id)}
            activeOpacity={0.7}>
            <Text style={styles.langFlag}>{lang.flag}</Text>
            <View style={styles.langTextContainer}>
              <Text
                style={[
                  styles.tierLabel,
                  currentLocale === lang.id && styles.tierLabelSelected,
                ]}>
                {lang.label}
              </Text>
              <Text style={styles.langNative}>{lang.native}</Text>
            </View>
            {currentLocale === lang.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Subscription Plan Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription Plan</Text>
        <Text style={styles.sectionHint}>
          Switch plans to see different modules in the SDK
        </Text>

        {TIERS.map(tier => (
          <TouchableOpacity
            key={tier.id}
            style={[
              styles.tierOption,
              currentTier === tier.id && styles.tierOptionSelected,
            ]}
            onPress={() => onTierChange(tier.id)}
            activeOpacity={0.7}>
            <View style={[styles.tierDot, {backgroundColor: tier.color}]} />
            <Text
              style={[
                styles.tierLabel,
                currentTier === tier.id && styles.tierLabelSelected,
              ]}>
              {tier.label}
            </Text>
            {currentTier === tier.id && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>SDK Version</Text>
          <Text style={styles.rowValue}>0.1.0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rowLabel}>App Version</Text>
          <Text style={styles.rowValue}>1.0.0</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onLogout}
        activeOpacity={0.7}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
    padding: 20,
  },
  section: {
    backgroundColor: brand.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: brand.textPrimary,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 13,
    color: brand.textSecondary,
    marginBottom: 16,
  },
  tierOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: brand.border,
    marginBottom: 8,
  },
  tierOptionSelected: {
    borderColor: brand.purple,
    backgroundColor: '#F5F0FF',
  },
  langFlag: {
    fontSize: 22,
    marginRight: 12,
  },
  langTextContainer: {
    flex: 1,
  },
  langNative: {
    fontSize: 12,
    color: brand.textSecondary,
    marginTop: 2,
  },
  tierDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  tierLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: brand.textPrimary,
  },
  tierLabelSelected: {
    color: brand.purple,
  },
  checkmark: {
    fontSize: 18,
    color: brand.purple,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowLabel: {
    fontSize: 15,
    color: brand.textSecondary,
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '600',
    color: brand.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: brand.border,
  },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '700',
  },
});
