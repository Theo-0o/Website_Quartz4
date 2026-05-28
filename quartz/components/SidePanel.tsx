import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/sidePanel.inline"

const SidePanel: QuartzComponent = (_props: QuartzComponentProps) => {
  return <></>
}

SidePanel.afterDOMLoaded = script

export default (() => SidePanel) satisfies QuartzComponentConstructor
