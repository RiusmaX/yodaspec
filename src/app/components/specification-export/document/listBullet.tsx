import { Text } from '@react-pdf/renderer'

function ListBullet ({ text }: { text: string }): React.ReactNode {
  return (
    <Text style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: 14, fontWeight: 'normal', paddingLeft: 10, textAlign: 'left' }}> * {text}</Text>
  )
}

export default ListBullet
