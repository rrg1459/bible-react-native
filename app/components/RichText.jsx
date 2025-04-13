import React from 'react';
import { Text, StyleSheet } from 'react-native';

const parseTextRecursively = (
  text,
  baseStyle,
  emphasisStyle,
  jesusQuoteStyle,
  promiseStyle,
  parentKey // Para generar keys únicas en React
) => {

  // Caso base: si no es un string procesable o está vacío, devolverlo tal cual.
  if (typeof text !== 'string' || text === '') return [text];

  // Regex para encontrar el *primer* bloque delimitado ([...] o ‹...›)
  // o todo el texto si no hay delimitadores.
  // Usa grupos de captura para identificar qué tipo de bloque se encontró.
  // Importante: El `.*?` (no codicioso) es clave para manejar el anidamiento correctamente
  // al encontrar el par de cierre más cercano primero. La s final ignora los salto de linea '\n'
  const regex = /^(.*?)(\[.*?\]|‹.*?›|{.*?})(.*)$/s;
  const match = text.match(regex);

  // Si no hay ningún bloque delimitado en el texto restante
  if (!match) return [text]; // Devuelve el texto plano restante

  // Descomponer la coincidencia
  const beforeText = match[1];  // Texto antes del primer bloque encontrado
  const blockMatch = match[2];  // El bloque completo encontrado (ej: '[content]' o '‹content›')
  const afterText = match[3];   // Texto después del primer bloque encontrado

  const elements = [];

  // 1. Añadir el texto plano ANTES del bloque (si existe)
  if (beforeText) elements.push(beforeText);

  // 2. Procesar el bloque encontrado
  let blockContent = '';
  let blockStyle = {};
  let blockType = '';

  if (blockMatch.startsWith('[')) {
    blockContent = blockMatch.slice(1, -1); // Contenido dentro de [...]
    blockStyle = emphasisStyle;
    blockType = 'emphasis';
  } else if (blockMatch.startsWith('{')) {
    blockContent = blockMatch.slice(1, -1); // Contenido dentro de {...}
    blockStyle = promiseStyle;
    blockType = 'promise';
  } else { // Debe ser ‹...›
    blockContent = blockMatch.slice(1, -1); // Contenido dentro de ‹...›
    blockStyle = jesusQuoteStyle;
    blockType = 'jesusQuote';
  }

  // Parsear recursivamente el CONTENIDO del bloque
  const innerElements = parseTextRecursively(
    blockContent,
    baseStyle, // Pasa los estilos base para referencia interna si es necesario
    emphasisStyle,
    jesusQuoteStyle,
    promiseStyle,
    `${parentKey}-${blockType}-inner` // Key única para la recursión interna
  );

  // Crear el elemento <Text> para este bloque con su estilo y contenido parseado
  elements.push(
    <Text key={`${parentKey}-${blockType}-block`} style={blockStyle}>
      {innerElements}
    </Text>
  );

  // 3. Procesar recursivamente el texto DESPUÉS del bloque (si existe)
  if (afterText) {
    const remainingElements = parseTextRecursively(
      afterText,
      baseStyle,
      emphasisStyle,
      jesusQuoteStyle,
      promiseStyle,
      `${parentKey}-after` // Key única para la parte restante
    );
    elements.push(...remainingElements); // Añadir los elementos resultantes
  }

  return elements.filter(el => el !== ''); // Filtrar strings vacíos
}

// --- Componente Principal ---
/**
 * Componente que renderiza un string, mostrando el texto encerrado
 * entre corchetes `[]` en cursiva (itálica) y el texto entre
 * comillas angulares sencillas `‹›` en color rojo.
 * Permite anidamiento (ej: `‹Texto rojo [con cursiva]›`).
 * Los delimitadores en sí (`[]`, `‹›`) no se muestran.
 */
const RichText = ({ children, jesusQuote, promise, favorite }) => {
  // Definir estilos finales combinando defaults y props
  const finalBaseStyle = StyleSheet.flatten([promise && styles.promise, favorite && styles.favorite]); // complete promise in versicule
  const finalEmphasisStyle = styles.emphasis;
  const finalJesusQuoteStyle = jesusQuote ? styles.jesusQuote : {};
  const finalPromiseStyle = styles.promise; // partial promise in versicule

  // Validación básica
  if (typeof children !== 'string') {
    console.warn('RichText component expects a string as children. Received:', typeof children);
    return <Text style={finalBaseStyle}>{children}</Text>;
  }

  // Iniciar el proceso de parseo recursivo
  const parsedElements = parseTextRecursively(
    children,
    finalBaseStyle,
    finalEmphasisStyle,
    finalJesusQuoteStyle,
    finalPromiseStyle,
    'root' // Key inicial para la recursión
  );

  // Renderizar los elementos parseados dentro de un <Text> base.
  // Esto es crucial para que los strings planos hereden el estilo base.
  return <Text style={finalBaseStyle}>{parsedElements}</Text>;
};

const styles = StyleSheet.create({
  emphasis: {
    fontStyle: 'italic',
  },
  jesusQuote: {
    color: '#D2042D', // cherry
  },
  promise: {
    backgroundColor: '#E8F0FF',
    // fontWeight: 'bold',
    // height: 20,
  },
  favorite: {
    textDecorationLine: 'underline',
  }
});

export default RichText;