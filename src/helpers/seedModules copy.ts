/**
 * Module seeder — publishes sample modules to the dev module-server on startup.
 * The module-server's ModuleStore is in-memory, so these must be seeded each launch.
 *
 * Publish format: { manifest: {...}, screens: {...} }
 * Manifest requires: id, name, version, description, icon, category, entryScreen,
 *                    screens (array of screen IDs), permissions, signature
 * Screen requires: id, title, body (not "root")
 * Signature must be valid base64 and decode to >= 32 bytes
 */

interface SeedModule {
  manifest: {
    id: string;
    name: string;
    version: string;
    description: string;
    icon: string;
    vendor: string;
    category: string;
    entryScreen: string;
    screens: string[];
    permissions: Record<string, unknown>;
    signature: string;
  };
  screens: Record<string, unknown>;
}

// Valid base64 signature that decodes to 48 bytes (meets PKIVerifier 32-byte minimum)
const DEV_SIGNATURE =
  'QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQQ==';

const sampleModules: SeedModule[] = [
  {
    manifest: {
      id: 'com.weconnect.myplan',
      name: 'My Mobile Plan',
      version: '1.0.0',
      description: 'View and manage your mobile plan details',
      icon: '',
      vendor: 'WeConnect',
      category: 'account',
      entryScreen: 'home',
      screens: ['home'],
      permissions: {},
      signature: DEV_SIGNATURE,
    },
    screens: {
      home: {
        id: 'home',
        title: 'My Mobile Plan',
        body: {
          type: 'column',
          props: {gap: 12},
          children: [
            {type: 'text', props: {value: 'My Mobile Plan'}},
            {
              type: 'card',
              children: [
                {
                  type: 'column',
                  props: {gap: 8},
                  children: [
                    {type: 'text', props: {value: 'Gold Plus'}},
                    {type: 'text', props: {value: 'AED 299/month'}},
                    {type: 'divider', props: {}},
                    {
                      type: 'row',
                      props: {justifyContent: 'space-between'},
                      children: [
                        {type: 'text', props: {value: 'Data'}},
                        {type: 'text', props: {value: '50 GB'}},
                      ],
                    },
                    {
                      type: 'row',
                      props: {justifyContent: 'space-between'},
                      children: [
                        {type: 'text', props: {value: 'Local Minutes'}},
                        {type: 'text', props: {value: 'Unlimited'}},
                      ],
                    },
                    {
                      type: 'row',
                      props: {justifyContent: 'space-between'},
                      children: [
                        {type: 'text', props: {value: 'International Mins'}},
                        {type: 'text', props: {value: '200 mins'}},
                      ],
                    },
                    {
                      type: 'row',
                      props: {justifyContent: 'space-between'},
                      children: [
                        {type: 'text', props: {value: 'SMS'}},
                        {type: 'text', props: {value: '500'}},
                      ],
                    },
                  ],
                },
              ],
            },
            {type: 'text', props: {value: 'Data Usage'}},
            {
              type: 'card',
              children: [
                {
                  type: 'column',
                  props: {gap: 8},
                  children: [
                    {
                      type: 'row',
                      props: {justifyContent: 'space-between'},
                      children: [
                        {type: 'text', props: {value: 'Used'}},
                        {type: 'text', props: {value: '32.6 GB'}},
                      ],
                    },
                    {
                      type: 'row',
                      props: {justifyContent: 'space-between'},
                      children: [
                        {type: 'text', props: {value: 'Remaining'}},
                        {type: 'text', props: {value: '17.4 GB'}},
                      ],
                    },
                    {
                      type: 'row',
                      props: {justifyContent: 'space-between'},
                      children: [
                        {type: 'text', props: {value: 'Renewal'}},
                        {type: 'text', props: {value: 'Mar 15, 2026'}},
                      ],
                    },
                  ],
                },
              ],
            },
            {type: 'text', props: {value: 'Quick Actions'}},
            {
              type: 'row',
              props: {gap: 8},
              children: [
                {
                  type: 'button',
                  props: {label: 'Buy Add-on', variant: 'primary'},
                },
                {
                  type: 'button',
                  props: {label: 'Change Plan', variant: 'outline'},
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    manifest: {
      id: 'com.weconnect.balance',
      name: 'Balance',
      version: '1.0.0',
      description: 'Check your account balance',
      icon: '',
      vendor: 'WeConnect',
      category: 'account',
      entryScreen: 'home',
      screens: ['home'],
      permissions: {},
      signature: DEV_SIGNATURE,
    },
    screens: {
      home: {
        id: 'home',
        title: 'Balance',
        body: {
          type: 'column',
          props: {gap: 12},
          children: [
            {type: 'text', props: {value: 'Current Balance'}},
            {
              type: 'card',
              children: [
                {type: 'text', props: {value: 'AED 125.50'}},
                {type: 'text', props: {value: 'Last updated: just now'}},
              ],
            },
            {
              type: 'button',
              props: {label: 'Refresh Balance', variant: 'primary'},
            },
          ],
        },
      },
    },
  },
  {
    manifest: {
      id: 'com.weconnect.datausage',
      name: 'Data Usage',
      version: '2.0.0',
      description: 'Monitor your data consumption with monthly and daily breakdowns',
      icon: '',
      vendor: 'WeConnect',
      category: 'usage',
      entryScreen: 'home',
      screens: ['home', 'daily-detail'],
      permissions: {},
      signature: DEV_SIGNATURE,
    },
    screens: {
      home: {
        id: 'home',
        title: 'Data Usage',
        dataSource: {
          url: '/api/subscriber/usage/monthly',
          method: 'GET',
          target: '$data.monthly',
        },
        body: {
          type: 'column',
          props: {gap: 12},
          children: [
            {type: 'text', props: {value: 'Data Usage'}},
            {
              type: 'card',
              children: [
                {
                  type: 'column',
                  props: {gap: 8},
                  children: [
                    {type: 'text', props: {value: 'Current Month'}},
                    {
                      type: 'chart',
                      props: {
                        chartType: 'gauge',
                        chartTitle: 'This Month',
                        gaugeValue: 18.4,
                        gaugeMax: 50,
                        gaugeUnit: 'GB',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'chart',
              props: {
                chartType: 'bar',
                chartTitle: 'Monthly Data Usage',
                chartData: '$data.monthly',
                chartLabel: 'month',
                chartValue: 'gb',
                chartOrientation: 'vertical',
                chartShowValues: true,
                chartHeight: 180,
                onChartPress: {
                  action: 'navigate',
                  screen: 'daily-detail',
                  params: {selectedMonth: '$event.label', totalGB: '$event.value'},
                },
              },
            },
            {
              type: 'button',
              props: {label: 'Buy More Data', variant: 'primary'},
            },
          ],
        },
      },
      'daily-detail': {
        id: 'daily-detail',
        title: '${$state.selectedMonth} — Daily Usage',
        dataSource: {
          url: '/api/subscriber/usage/daily/${$state.selectedMonth}',
          method: 'GET',
          target: '$data.daily',
        },
        body: {
          type: 'column',
          props: {gap: 12},
          children: [
            {
              type: 'row',
              props: {justifyContent: 'space-between', alignItems: 'center'},
              children: [
                {
                  type: 'button',
                  props: {label: 'Back', variant: 'outline', onPress: {action: 'go_back'}},
                },
                {type: 'text', props: {value: '${$state.selectedMonth} — ${$state.totalGB} GB total'}},
              ],
            },
            {
              type: 'chart',
              props: {
                chartType: 'bar',
                chartTitle: 'Daily Usage — ${$state.selectedMonth}',
                chartData: '$data.daily',
                chartLabel: 'day',
                chartValue: 'gb',
                chartOrientation: 'vertical',
                chartShowValues: true,
                chartHeight: 220,
              },
            },
          ],
        },
      },
    },
  },
  {
    manifest: {
      id: 'com.weconnect.topup',
      name: 'Top Up',
      version: '1.0.0',
      description: 'Recharge your account',
      icon: '',
      vendor: 'WeConnect',
      category: 'billing',
      entryScreen: 'home',
      screens: ['home'],
      permissions: {},
      signature: DEV_SIGNATURE,
    },
    screens: {
      home: {
        id: 'home',
        title: 'Top Up',
        body: {
          type: 'column',
          props: {gap: 12},
          children: [
            {type: 'text', props: {value: 'Quick Top Up'}},
            {
              type: 'row',
              props: {gap: 12, wrap: true},
              children: [
                {type: 'button', props: {label: 'AED 25', variant: 'secondary'}},
                {type: 'button', props: {label: 'AED 50', variant: 'secondary'}},
                {type: 'button', props: {label: 'AED 100', variant: 'secondary'}},
                {type: 'button', props: {label: 'AED 200', variant: 'secondary'}},
              ],
            },
            {type: 'divider', props: {}},
            {type: 'text', props: {value: 'Custom Amount'}},
            {
              type: 'input',
              props: {
                label: 'Amount (AED)',
                placeholder: 'Enter amount',
                keyboardType: 'numeric',
              },
            },
            {
              type: 'button',
              props: {label: 'Top Up Now', variant: 'primary'},
            },
          ],
        },
      },
    },
  },
];

export async function seedModules(moduleServerUrl: string): Promise<void> {
  for (const mod of sampleModules) {
    try {
      const res = await fetch(`${moduleServerUrl}/api/modules/publish`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(mod),
      });
      const data = await res.json();
      if (!res.ok) {
        console.warn(`[SeedModules] Failed to publish ${mod.manifest.id}:`, data);
      }
    } catch {
      // Module server might not be running — fail silently
    }
  }
}
