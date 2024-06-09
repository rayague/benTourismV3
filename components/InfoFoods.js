import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

export default function InfoFoods() {
  return (
    <SafeAreaView>
      <Text style={styles.headingText}>Les mets tendances du Bénin</Text>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.experience-outdoor.com/wp-content/uploads/2023/07/sauce-le-man-tindjan-pour-accompagne-le-pate-de-mais-plat-legendaire-du-benin-1024x1024.jpeg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Sauce Le Man Tindjan : </Text> Un
              plat légendaire du Bénin, combinant les graines de tamarin
              fermentées et la pâte de sésame, accompagnant parfaitement les
              pâtes de maïs.
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://lesgourmandisesdekarelle.com/wp-content/uploads/2019/11/IMG_9047-1.jpg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Atassi : </Text> Un plat de riz et
              de haricots mélangés, servi avec une sauce et du poisson ou de la
              viande.
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/5c/9c/04/attcheke-moyo-aloko-une.jpg?w=600&h=400&s=1',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Attiéké : </Text> L'Attiéké Moyo
              Aloko, un festin béninois, mélange de couscous de manioc, de
              poissons grillés et de bananes plantains frites, une explosion de
              saveurs africaines.
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.experience-outdoor.com/wp-content/uploads/2023/07/les-specialites-culinaires-du-benin.jpeg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Piron Rouge : </Text> Piron Rouge,
              une spécialité béninoise exquise, mélange de semoule de manioc et
              de sauce pimentée à la viande, un pur délice.
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.experience-outdoor.com/wp-content/uploads/2023/07/pate-rouge-plat-traditionnel-du-benin-e1686128990385.jpg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Pâte Rouge : </Text> La Pâte Rouge,
              un plat traditionnel béninois, une symphonie de saveurs épicées et
              savoureuses dans chaque bouchée, une expérience culinaire
              inoubliable.
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.salondessolidarites.org/wp-content/uploads/2018/04/featured-igname-pilee.png',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Igname Pilé : </Text> L'Igname Pilé,
              un trésor de la cuisine béninoise, une purée d'ignames tendre et
              savoureuse, un délice réconfortant aux notes subtiles.
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://mabouffeblog.wordpress.com/wp-content/uploads/2017/09/wp-image-826908156.jpg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Kom : </Text> Le Kom, une spécialité
              béninoise, un plat traditionnel à base de riz et de viande en
              sauce, un festin réconfortant.
            </Text>
          </View>
        </View>
        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://ifkema.com/storage/plat_image/YJUJX5WoysMKDsPFII365enajssgFEGpQgf5ymv1.jpg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Sauce de Noix de Palme : </Text> La
              Sauce de Noix de Palme, un pilier de la cuisine béninoise, une
              sauce riche et onctueuse, préparée avec amour à partir de noix de
              palme fraîches, un véritable délice pour les papilles.
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://panierlibre.com/bj/wp-content/uploads/sites/3/2021/11/image-24.png',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Ablo : </Text> L'Ablo, une
              spécialité béninoise, une galette de maïs légère et moelleuse,
              parfaite pour accompagner les plats traditionnels ou à déguster
              seule pour une expérience authentique.
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://www.experience-outdoor.com/wp-content/uploads/2023/07/le-pate-noire-recette-du-benin-1024x1007.jpeg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Atassi : </Text> Un plat de riz et
              de haricots mélangés, servi avec une sauce et du poisson ou de la
              viande.
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://panierlibre.com/bj/wp-content/uploads/sites/3/2021/11/201596020_3093216534239841_5106166061380320965_n.jpg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Toubani : </Text> Le Toubani, une
              gourmandise béninoise, des beignets de farine de maïs frits,
              croustillants à l'extérieur et moelleux à l'intérieur, une douceur
              irrésistible.
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.elevatedCard]}>
          <Image
            source={{
              uri: 'https://benin.auletch.com/wp-content/uploads/sites/4/2020/11/igname-pile-a-la-sauce-arachide.jpeg',
            }}
            style={styles.imageCard}
          />
          <View style={styles.textContainter}>
            <Text style={styles.text}>
              <Text style={styles.boldText}>Sauce de Gombo : </Text> La Sauce de
              Gombo, un délice béninois, une sauce onctueuse à base de gombo
              frais et d'épices savamment mélangées, accompagnant parfaitement
              les plats traditionnels.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    padding: 8,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width:250,
    // height:250,
    borderRadius: 4,
    margin: 8,
    elevation: 20,  
  },
  elevatedCard: {
    // backgroundColor: 'gray',
  },
  imageCard: {
    width: 340,
    height: 200,
  },
  textContainter: {
    width: 340,
    height: 120,
    padding: 10,
    backgroundColor: 'rgba(0,0,0, 0.7)',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    elevation: 6,  
    
  },
  text: {
    color: 'white',
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
