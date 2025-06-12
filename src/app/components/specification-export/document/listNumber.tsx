import { Text } from '@react-pdf/renderer'

function ListNumber ({ etape, index }: { etape: string, index: number }): React.ReactNode {
  return (
    <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', paddingLeft: '0 10', textAlign: 'left' }}> {index + 1} {etape}</Text>
  )
}

export default ListNumber
