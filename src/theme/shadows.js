// Sombras que dão volume aos elementos (relevo, profundidade e afundamento).
// boxShadow funciona no Android, iOS e web na nova arquitetura do React Native.
export const shadows = {
  // Objeto apoiado sobre a mesa
  raised: { boxShadow: '0px 6px 10px rgba(30, 14, 4, 0.45), 0px 2px 3px rgba(30, 14, 4, 0.35)' },
  // Objeto mais alto (foto, cartão destacado)
  floating: { boxShadow: '0px 12px 18px rgba(30, 14, 4, 0.45), 0px 3px 5px rgba(30, 14, 4, 0.3)' },
  // Campo afundado no material (input)
  inset: {
    boxShadow:
      'inset 0px 3px 6px rgba(40, 20, 6, 0.45), inset 0px -1px 0px rgba(255, 255, 255, 0.35)',
  },
  // Botão em relevo com brilho na borda superior
  button: {
    boxShadow:
      'inset 0px 1px 0px rgba(255, 255, 255, 0.55), inset 0px -2px 3px rgba(0, 0, 0, 0.25), 0px 4px 6px rgba(30, 14, 4, 0.45)',
  },
  buttonPressed: {
    boxShadow: 'inset 0px 3px 6px rgba(0, 0, 0, 0.45), 0px 1px 1px rgba(30, 14, 4, 0.3)',
  },
};

// Texto gravado (baixo relevo) sobre couro ou madeira
export const embossedText = {
  textShadowColor: 'rgba(0, 0, 0, 0.6)',
  textShadowOffset: { width: 0, height: -1 },
  textShadowRadius: 0,
};

// Texto em alto relevo sobre papel ou metal
export const letterpressText = {
  textShadowColor: 'rgba(255, 255, 255, 0.7)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 0,
};
