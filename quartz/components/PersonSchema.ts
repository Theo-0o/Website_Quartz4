import { QuartzComponent, QuartzComponentConstructor } from "./types"

const PersonSchema: QuartzComponent = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://christopher-theophanous.info/#person",
    "name": "Christopher Theophanous",
    "alternateName": [
      "Christopher (Theo) Theophanous",
      "Theo Theophanous"
    ],
    "url": "https://christopher-theophanous.info/"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}

export default (() => PersonSchema) satisfies QuartzComponentConstructor