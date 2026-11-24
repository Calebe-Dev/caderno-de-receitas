import { Linking, StyleSheet, Text, View } from 'react-native';

import GlossyButton from '../components/GlossyButton';
import LeatherHeader from '../components/LeatherHeader';
import PaperCard from '../components/PaperCard';
import Polaroid from '../components/Polaroid';
import ScreenContainer from '../components/ScreenContainer';
import Stamp from '../components/Stamp';
import { team } from '../data/team';
import { colors, fonts, layout } from '../theme';

const TILTS = [-3, 2.5];

export default function AboutScreen({ navigation }) {
  const goBack = () => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Home'));

  return (
    <ScreenContainer header={<LeatherHeader title="Sobre nós" subtitle="quem fez este caderno" onBack={goBack} />}>
      <PaperCard style={styles.intro}>
        <Text style={styles.title}>Caderno de Receitas</Text>
        <Text style={styles.text}>
          App criado para a disciplina de Tópicos Especiais. As receitas vêm da API pública
          TheMealDB e o visual imita um caderno de receitas de verdade, apoiado na mesa da cozinha.
        </Text>
      </PaperCard>

      <View style={styles.members}>
        {team.map((member, index) => (
          <PaperCard key={member.name} style={styles.member} contentStyle={styles.memberContent}>
            <Polaroid source={member.photo} size={150} tilt={TILTS[index % TILTS.length]} caption={member.user} />

            <Text style={styles.name}>{member.name}</Text>
            <Stamp icon="code-slash" label={member.role} />
            <Text style={[styles.text, styles.bio]}>{member.bio}</Text>

            <GlossyButton
              title="Ver GitHub"
              icon="logo-github"
              variant="leather"
              onPress={() => Linking.openURL(member.github)}
              style={styles.button}
            />
          </PaperCard>
        ))}
      </View>

      <Text style={styles.footer}>Dados fornecidos por TheMealDB · 2026</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: {
    marginBottom: layout.gutter + 4,
    transform: [{ rotate: '-0.6deg' }],
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.leather,
    marginBottom: 4,
  },
  text: {
    fontFamily: fonts.hand,
    fontSize: 16,
    lineHeight: 23,
    color: colors.ink,
  },
  // Cartões lado a lado em telas largas e empilhados no celular.
  members: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: layout.gutter,
  },
  member: {
    flexGrow: 1,
    flexBasis: 280,
  },
  memberContent: {
    alignItems: 'center',
    paddingTop: 26,
  },
  name: {
    fontFamily: fonts.title,
    fontSize: 20,
    color: colors.ink,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  bio: {
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  button: {
    alignSelf: 'stretch',
  },
  footer: {
    fontFamily: fonts.hand,
    fontSize: 15,
    color: colors.stitch,
    textAlign: 'center',
    marginTop: layout.gutter + 4,
  },
});
