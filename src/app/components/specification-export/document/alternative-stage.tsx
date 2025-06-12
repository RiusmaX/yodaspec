import { IStage } from '@/types/interfaces'
import { Text, View } from '@react-pdf/renderer'
import ListBullet from './listBullet'
import { Fragment } from 'react'

function AlternativeStage({ scenario, key2 }: { scenario: IStage, key2: string }): React.ReactNode {
  return (
    <View style={{ paddingLeft: 10, width: '100%' }}>
      <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, color: '#60b577', fontWeight: 'bold' }}>{scenario.Name}</Text>
      <View style={{ paddingLeft: 10, width: '100%' }}>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 12 }}>{scenario.Description}</Text>
        {scenario['Expected Result'].map((result, index) => (
          <Fragment key={`${key2}-result-${index}`}>
            {index === 0 && <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 13 }}>Résultats attendu</Text>}
            <ListBullet text={result} />
          </Fragment>
        ))}
      </View>
    </View>
  )
}

export default AlternativeStage
