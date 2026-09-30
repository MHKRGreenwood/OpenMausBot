export type ConnectedAppsMode = "managed" | "self-hosted" | "unavailable";

const MANAGED_CUSTOM_AUTH_TOOLKITS = new Map<string, string>([
  ["twitter", "Twitter/X needs your own X Developer app and Composio auth config."],
  ["x", "Twitter/X needs your own X Developer app and Composio auth config."],
  ["_1password", "1Password has no shared sign-in — it needs your own Composio auth config with a 1Password service account token."],
]);

/**
 * Some Composio toolkits no longer include provider-managed credentials.
 * The official OpenMausBot broker cannot offer those connections until its
 * project owns the corresponding OAuth app or auth config. Self-hosted Composio
 * projects can still supply their own auth config, so keep this restriction
 * mode-specific.
 */
export function managedConnectorUnavailableReason(
  mode: ConnectedAppsMode,
  slug: string,
): string | null {
  const reason = MANAGED_CUSTOM_AUTH_TOOLKITS.get(slug.trim().toLowerCase());
  if (mode !== "managed" || !reason) return null;
  return `${reason} Use self-hosted connected apps for now.`;
}
