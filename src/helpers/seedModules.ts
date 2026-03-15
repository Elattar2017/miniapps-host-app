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

const sampleModules: SeedModule[] = [];

export async function seedModules(moduleServerUrl: string): Promise<void> {
  for (const mod of sampleModules) {
    try {
      const res = await fetch(`${moduleServerUrl}/api/modules/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mod),
      });
      const data = await res.json();
      if (!res.ok) {
        console.warn(
          `[SeedModules] Failed to publish ${mod.manifest.id}:`,
          data,
        );
      }
    } catch {
      // Module server might not be running — fail silently
    }
  }
}
