import { IFeature } from '@/types/interfaces'
import { Text, View } from '@react-pdf/renderer'
import ListBullet from './listBullet'
import AlternativeStage from './alternative-stage'

function SpecificationDocument({ specification, key2 }: { specification: IFeature, key2: string }): React.ReactNode {
  return (
    <View style={{ width: '100%', paddingLeft: 10, paddingTop: 25 }}>
      <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 18, textAlign: 'left', color: '#1e6130', fontWeight: 'bold' }}>{specification.Name}</Text>
      <View style={{ width: '100%', paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', textAlign: 'left' }}>{specification.Description}</Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 16, fontWeight: 'normal', textAlign: 'left' }}>Objectif: </Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', textAlign: 'left' }}>{specification.Objective}</Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 16, fontWeight: 'normal', textAlign: 'left' }}>Conditions de succès: </Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', textAlign: 'left' }}>{specification['Success Conditions']}</Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 16, fontWeight: 'normal', textAlign: 'left' }}>Acteurs: </Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', textAlign: 'left' }}>{specification.Actors.join(', ')}</Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 16, fontWeight: 'normal', textAlign: 'left' }}>Preconditions: </Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', textAlign: 'left' }}>{specification.Preconditions.join(', ')}</Text>

        {specification['Flow Steps'].map((step, index) => (
          <>
            {index === 0 && <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 16, fontWeight: 'normal', textAlign: 'left' }}>Etapes de flux: </Text>}
            <ListBullet key={`${key2}-step-${index}`} text={step} />
          </>
        ))}
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 16, fontWeight: 'normal', textAlign: 'left' }}>Postconditions: </Text>
        <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', textAlign: 'left' }}>{specification.Postconditions.join(', ')}</Text>
        {specification['Alternative Scenario'].map((scenario, index) => (
          <>
            {index === 0 && <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 16, fontWeight: 'normal', textAlign: 'left' }}>Scénario alternatif: </Text>}
            <AlternativeStage key={`${key2}-stage-${index}`} scenario={scenario} key2={`${key2}-stage-${index}`} />
          </>
        ))}
      </View>
    </View>
  )
}

export default SpecificationDocument
