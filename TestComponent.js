// Dans le composant -- TestComponent
import { useKkiapay } from '@kkiapay-org/react-native-sdk';
import { useEffect } from 'react';
import { Button, View } from 'react-native';

export default function TestComponent() {
  const { openKkiapayWidget, addSuccessListener, addFailedListener } = useKkiapay();

  useEffect(() => {
    addSuccessListener(data => {
      console.log('data ', data);
    });
    
    addFailedListener(data => {
      console.log('data ', data);
    });
  }, []);

  const openWidget = () => {
    openKkiapayWidget({
      amount: 4000,
      api_key: "xxxxxxxxxxxxxxxxxx",
      sandbox: true,
      email: "randomgail@gmail.com",
      phone: "97000000",
    });
  };

  return (
    <View>
      <Button title="Payer maintenant" onPress={openWidget} />
    </View>
  );
}