import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';

export default function CulturesList() {
  return (
    <SafeAreaView>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={[styles.card, styles.elevatedCard]}></View>
        <Text style={styles.headingText}>Découvrez avec nous</Text>
        <View>
          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://mediapartbenin.com/upload/thumbnails/0861413001698215290.jpeg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>La Fête du Vaudou</Text>
              {/* <Text style={styles.cardLabel}>Ouidah </Text> */}
              <Text style={styles.cardDescription}>
                La Fête du Vaudou, également connue sous le nom de Aného Vodoun
                Festival, est une célébration nationale annuelle vibrante qui a
                lieu au Bénin, en particulier dans la ville d'Ouidah, considérée
                comme la capitale mondiale du Vaudou. Cette fête met à l'honneur
                les traditions vaudoues riches et diversifiées du pays, rendant
                hommage aux divinités, aux ancêtres et aux pratiques
                spirituelles qui ont façonné la culture béninoise.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.72,999</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://www.nomade-aventure.com/content/images/imgproduits/ben/10914/479772_carre_lg.ori.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>
                Festival des Arts Vodoun à Ouidah
              </Text>
              {/* <Text style={styles.cardLabel}>Abomey-Calavi</Text> */}
              <Text style={styles.cardDescription}>
                Ce festival annuel, organisé en février ou mars, met l'accent
                sur les expressions artistiques liées au Vaudou, notamment la
                musique, la danse, la sculpture et l'artisanat.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.215,998</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://destinationafrique.io/wp-content/uploads/2021/10/Adepte-Sakpata-vodoun-Benin.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Festival Vaudoun d'Agoué</Text>
              {/* <Text style={styles.cardLabel}> Allada </Text> */}
              <Text style={styles.cardDescription}>
                Ce festival, qui a lieu généralement en septembre ou octobre
                dans la ville d'Agoué, honore la divinité vaudoue Agoué, liée à
                la mer et aux pêcheurs.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.115,898</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1280,height=960,fit=cover,gravity=0.4861x0.2574/https://prod.cdn-medias.jeuneafrique.com/medias/2024/01/31/jad20240131-cm-benin-musee-vodun.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Festival Vaudoun d'Akpohoun</Text>
              {/* <Text style={styles.cardLabel}> Abomey </Text> */}
              <Text style={styles.cardDescription}>
                Organisé en novembre ou décembre dans la ville d'Akpohoun, ce
                festival célèbre la divinité vaudoue Mami Wata, associée à l'eau
                et à la féminité.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.45,690</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://benin.auletch.com/wp-content/uploads/sites/4/2020/11/mahi-min.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>La culture Gbe</Text>
              {/* <Text style={styles.cardLabel}> Porte-Novo </Text> */}
              <Text style={styles.cardDescription}>
                Les Gbe, répartis dans le sud du Bénin, ont une culture
                dynamique marquée par la musique, la danse et les festivités.
                Leurs rythmes syncopés et leurs danses énergiques animent les
                célébrations et les rassemblements communautaires. La religion
                traditionnelle Gbe vénère un panthéon de divinités associées à
                divers aspects de la vie quotidienne.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.325,690</Text> */}
            </View>
            <View>
              <View
                style={[styles.card, styles.cardElevated, styles.alignCenter]}>
                <Image
                  source={{
                    uri: 'https://agricultureaufeminin.wordpress.com/wp-content/uploads/2017/08/igname-3.jpg',
                  }}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>
                  Le Festival de l'Igname Pilée
                </Text>
                {/* <Text style={styles.cardLabel}> Natitingou </Text> */}
                <Text style={styles.cardDescription}>
                  Le Festival de l'Igname Pilée, également connu sous le nom de
                  Yèhounhoun ou Gléhounhoun, est une célébration annuelle
                  vibrante qui a lieu au Bénin, en particulier dans la région de
                  Savalou. Il marque la récolte de l'igname, un tubercule
                  important qui constitue un aliment de base pour de nombreuses
                  communautés dans le pays.
                </Text>
                {/* <Text style={styles.cardFooter}>Rs.325,690</Text> */}
              </View>
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Zangpetos_running.jpg/1200px-Zangpetos_running.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Le Zangbéto</Text>
              {/* <Text style={styles.cardLabel}> Possotomè </Text> */}
              <Text style={styles.cardDescription}>
                Le Zangbéto est une figure emblématique de la culture vaudoue au
                Bénin, particulièrement dans les régions du sud-ouest du pays.
                Il s'agit d'une société secrète d'hommes masqués, chargés de
                veiller sur la sécurité et la moralité des villages pendant la
                nuit.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.325,690</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://beninwebtv.com/wp-content/uploads/2021/10/I0000vg7l1b55rqk-1.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>La Fête de la Gani</Text>
              {/* <Text style={styles.cardLabel}> Nord Bénin </Text> */}
              <Text style={styles.cardDescription}>
                La Fête de la Gani, également connue sous le nom de Tchanka ou
                Hêviosso, est une célébration annuelle unique qui a lieu au
                Bénin, en particulier dans les régions du sud du pays. Elle rend
                hommage à Yemanjá, déesse de l'eau et de la maternité dans la
                religion vodoue, et célèbre la puissance et le rôle crucial des
                femmes dans la société.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.325,690</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://i.ytimg.com/vi/LpXpQSAWkIQ/maxresdefault.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>
                La danse Têkê est la danse des bâtons
              </Text>
              {/* <Text style={styles.cardLabel}> Dassa-Zoumè </Text> */}
              <Text style={styles.cardDescription}>
                La danse Têkê, également connue sous le nom de danse des bâtons,
                est une expression vibrante de la culture béninoise. Les
                danseurs, munis de bâtons, exécutent des mouvements rythmiques
                et synchronisés, créant un spectacle envoûtant et énergique.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.325,690</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://miro.medium.com/v2/resize:fit:1200/1*-1-ytKUv9Q004UjK68uCeg.jpeg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>La culture Yoruba</Text>
              {/* <Text style={styles.cardLabel}> Dassa-Zoumè </Text> */}
              <Text style={styles.cardDescription}>
                La culture Yoruba est connue pour sa musique, sa danse et sa
                religion. Les Yoruba sont des musiciens et des danseurs
                talentueux qui interprètent un large éventail de styles de
                musique et de danse. Ils sont également des adeptes de la
                religion traditionnelle Yoruba, qui est une religion polythéiste
                qui vénère un certain nombre de dieux et d'esprits.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.325,690</Text> */}
            </View>
          </View>

          <View>
            <View
              style={[styles.card, styles.cardElevated, styles.alignCenter]}>
              <Image
                source={{
                  uri: 'https://afroculture.net/wp-content/uploads/2017/02/couple-noir-en-tenue-kente10.jpg',
                }}
                style={styles.cardImage}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>La culture Dendi</Text>
              {/* <Text style={styles.cardLabel}> Dassa-Zoumè </Text> */}
              <Text style={styles.cardDescription}>
                Les Adja, établis dans le sud-est du Bénin, sont connus pour
                leur système de gouvernance unique basé sur des conseils
                villageois et des chefs spirituels. Leur culture met l'accent
                sur l'harmonie avec la nature, les pratiques agricoles
                traditionnelles et les cérémonies initiatiques. L'art Adja se
                distingue par ses sculptures sur bois finement ouvragées et ses
                masques expressifs.
              </Text>
              {/* <Text style={styles.cardFooter}>Rs.325,690</Text> */}
            </View>
          </View>
          {/* <BottomList /> */}
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
    paddingVertical: 10,
  },
  alignCenter: {
    // flex:1,
    // justifyContent:'center',
    alignItems: 'center',
  },
  card: {
    // width: 320,
    // height: 280,
    // backgroundColor:'gray'
    elevation: 20,
  },
  cardElevated: {
    //    backgroundColor:'#ffffff',
    // elevation:3, 
    elevation: 20,

    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  cardImage: {
    width: 330,
    height: 290,
    // borderRadius:6,
    marginBottom: 0,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    // borderTopEndRadius:10,
    // marginHorizontal:15,
    // marginVertical:12,
    elevation: 10,

  },
  cardBody: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 20, 
    marginHorizontal: 15,
    // marginVertical:0,
    marginBottom: 20,
    paddingHorizontal: 5,
    elevation: 20,
        borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,

    
  },
  cardTitle: {
    color: '#000000',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'auto',
    marginBottom: 4,
  },
  cardLabel: {
    color: '#111',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 6,
  },
  cardDescription: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 10,
    marginTop: 5,
  },
  cardFooter: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
