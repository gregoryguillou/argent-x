import { isString } from "lodash-es"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const route = <T extends (..._: any[]) => string>(
  ...[value, path]: [routeAndPath: string] | [routeWithParams: T, path: string]
): T & { path: string } => {
  if (isString(value)) {
    return Object.defineProperty((() => value) as any, "path", { value })
  }
  return Object.defineProperty(value as any, "path", { value: path })
}

/** a route function with a `returnTo` query parameter */

export const routeWithReturnTo = (route: string) => {
  const returnTo = (returnTo?: string) =>
    returnTo ? `${route}?returnTo=${encodeURIComponent(returnTo)}` : route
  returnTo.path = route
  return returnTo
}

/** hook that builds on useLocation to parse query string */

export const useQuery = () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

/** hook to get the `returnTo` query parameter */

export const useReturnTo = () => {
  /** get() returns null for missing value, cleaner to return undefined */
  return useQuery().get("returnTo") || undefined
}

export const routes = {
  welcome: route("/index.html"),
  newWallet: route("/wallets/new"),
  backupRecovery: route("/recover/backup"),
  seedRecovery: route("/recover/seed"),
  seedRecoveryPassword: route("/recover/seed/password"),
  setupRecovery: routeWithReturnTo("/recovery"),
  setupSeedRecovery: routeWithReturnTo("/recovery/seed"),
  confirmSeedRecovery: routeWithReturnTo("/recovery/seed/confirm"),
  lockScreen: route("/lock-screen"),
  accountTokens: route("/account/tokens"),
  accountCollections: route("/account/collections"),
  accountActivity: route("/account/activity"),
  collectionNfts: route(
    (contractAddress: string) => `/account/collection/${contractAddress}`,
    `/account/collection/:contractAddress`,
  ),
  accountNft: route(
    (contractAddress: string, tokenId: string) =>
      `/account/nfts/${contractAddress}/${tokenId}`,
    `/account/nfts/:contractAddress/:tokenId`,
  ),
  accountHideConfirm: route(
    (accountAddress: string) => `/account/hide-confirm/${accountAddress}`,
    `/account/hide-confirm/:accountAddress`,
  ),
  accountDeleteConfirm: route(
    (accountAddress: string) => `/account/delete-confirm/${accountAddress}`,
    `/account/delete-confirm/:accountAddress`,
  ),
  sendScreen: route("/send"),
  sendToken: route(
    (tokenAddress: string) => `/send-token/${tokenAddress}`,
    "/send-token/:tokenAddress",
  ),
  sendNft: route(
    (contractAddress: string, tokenId: string) =>
      `/account/send-nft/${contractAddress}/${tokenId}`,
    `/account/send-nft/:contractAddress/:tokenId`,
  ),
  transactionDetail: route(
    (txHash: string) => `/account/activity/transaction-detail/${txHash}`,
    `/account/activity/transaction-detail/:txHash`,
  ),
  upgrade: route("/account/upgrade"),
  accounts: route("/accounts"),
  accountsHidden: route("/accounts/hidden"),
  newToken: route("/tokens/new"),
  funding: route("/funding"),
  fundingBridge: route("/funding/bridge"),
  exportPrivateKey: route("/export-private-key"),
  fundingQrCode: route("/funding/qr-code"),
  fundingProvider: route("/funding/provider"),
  token: route(
    (tokenAddress: string) => `/tokens/${tokenAddress}`,
    "/tokens/:tokenAddress",
  ),
  hideToken: route(
    (tokenAddress: string) => `/tokens/${tokenAddress}/hide`,
    "/tokens/:tokenAddress/hide",
  ),
  addPlugin: route(
    (accountAddress) => `/add-plugin/${accountAddress}`,
    "/add-plugin/:accountAddress",
  ),
  reset: route("/reset"),
  disclaimer: route("/disclaimer"),
  migrationDisclaimer: route("/migration-disclaimer"),
  legacy: route("/legacy"),
  settings: route("/settings"),
  settingsNetworks: route("/settings/networks"),
  settingsSeed: routeWithReturnTo("/settings/seed"),
  settingsAddCustomNetwork: route("/settings/networks/add"),
  settingsEditCustomNetwork: route("/settings/networks/edit"),
  settingsRemoveCustomNetwork: route("/settings/networks/remove"),
  settingsDappConnections: route("/settings/dapp-connections"),
  settingsPrivacy: route("/settings/privacy"),
  settingsExperimental: route("/settings/experimental"),
  settingsAddressbook: route("/settings/addressbook"),
  settingsAddressbookEdit: route(
    (contactId) => `/settings/addressbook/add-or-edit/${contactId}`,
    "/settings/addressbook/add-or-edit/:contactId",
  ),
  settingsAddressbookAdd: route("/settings/addressbook/add-or-edit"),
  networkWarning: route("/network-warning"),
  backupDownload: route(
    (isFromSettings?: boolean) =>
      `/backup-download${isFromSettings ? "?settings" : ""}`,
    "/backup-download",
  ),
  privacyStatement: route("/privacy-statement"),
  error: route("/error"),
}
