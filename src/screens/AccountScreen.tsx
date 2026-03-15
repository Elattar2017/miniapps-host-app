import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {brand} from '../theme';

interface AccountScreenProps {
  msisdn: string;
  tier: string;
}

const PLAN_NAMES: Record<string, string> = {
  extra: 'Extra',
  WeGold1000: 'We Gold 1000',
  WeGold2000: 'We Gold 2000',
};

export function AccountScreen({
  msisdn,
  tier,
}: AccountScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {msisdn.slice(-2)}
          </Text>
        </View>
        <Text style={styles.msisdn}>{msisdn}</Text>
        <View style={styles.tierBadge}>
          <Text style={styles.tierText}>{(PLAN_NAMES[tier] ?? tier).toUpperCase()} PLAN</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Phone Number</Text>
          <Text style={styles.rowValue}>{msisdn}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Plan</Text>
          <Text style={styles.rowValue}>{PLAN_NAMES[tier] ?? tier}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Status</Text>
          <Text style={[styles.rowValue, styles.activeText]}>Active</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Operator</Text>
          <Text style={styles.rowValue}>WeConnect</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
    padding: 20,
  },
  profileCard: {
    backgroundColor: brand.purple,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: brand.white,
  },
  msisdn: {
    fontSize: 22,
    fontWeight: '700',
    color: brand.white,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tierBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tierText: {
    color: brand.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  section: {
    backgroundColor: brand.white,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: brand.textPrimary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  activeText: {
    color: '#16A34A',
  },
  divider: {
    height: 1,
    backgroundColor: brand.border,
  },
});
