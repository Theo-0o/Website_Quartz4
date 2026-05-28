import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.TagList(),
  ],
  footer: Component.Footer({
    links: {},
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.MobileOnly(Component.PageTitle()),
  ],
  left: [
    Component.DesktopOnly(Component.PageTitle()),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({
      useSavedState: false,
      folderClickBehavior: "collapse",
      sortFn: function(a, b) {
        const tagA = a.data?.tags?.find(function(t) { return t.startsWith("order-") })
        const tagB = b.data?.tags?.find(function(t) { return t.startsWith("order-") })
        const ao = tagA ? parseInt(tagA.split("-")[1]) : 999
        const bo = tagB ? parseInt(tagB.split("-")[1]) : 999
        if (ao !== bo) return ao - bo
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (!a.isFolder && b.isFolder) return 1
        return -1
      },
    }),
  ],
  right: [
    Component.SidePanel(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.MobileOnly(Component.PageTitle()),
  ],
  left: [
    Component.DesktopOnly(Component.PageTitle()),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({
      useSavedState: false,
      folderClickBehavior: "collapse",
      sortFn: function(a, b) {
        const tagA = a.data?.tags?.find(function(t) { return t.startsWith("order-") })
        const tagB = b.data?.tags?.find(function(t) { return t.startsWith("order-") })
        const ao = tagA ? parseInt(tagA.split("-")[1]) : 999
        const bo = tagB ? parseInt(tagB.split("-")[1]) : 999
        if (ao !== bo) return ao - bo
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (!a.isFolder && b.isFolder) return 1
        return -1
      },
    }),
  ],
  right: [
    Component.SidePanel(),
  ],
}