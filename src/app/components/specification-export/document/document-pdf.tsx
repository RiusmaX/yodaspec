import SpecificationDocument from '@/app/components/specification-export/document/specification-document'
import { IFeature } from '@/types/interfaces'
import { Document, Image, Page, Text, View } from '@react-pdf/renderer'

function DocumentPDF({ features }: { features: IFeature[] }): React.ReactNode {
  return (
    <Document>
      <Page size='A4'>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 20, fontWeight: 'bold', margin: 7 }}>Spécifications fonctionnelles</Text>
          <Image src='/YodaSpecs.jpg' style={{ width: '20%', height: 'auto' }} />
          {features.map((specification, index) => (
            <SpecificationDocument specification={specification} key={`spec-${index}`} key2={`spec-${index}`} />
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default DocumentPDF
