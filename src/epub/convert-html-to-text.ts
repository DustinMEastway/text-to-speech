const textReplacements: [RegExp, string][] = [
  // Remove comments.
  [/<!--[\s\S]*?-->/g, ''],
  // Remove opening and closing tags.
  [/<[\/!]?\??[A-Za-z][^>]*>/g, ''],
  // Tidy up newline whitespaces.
  [/\s*\n\s*/g, '\n'],
  // Double Quote.
  [/&quot;|&#34;/g, '&'],
  // Ampersand.
  [/&amp;|&#38;/g, '&'],
  // Single Quote.
  [/&apos;|&#39;/g, '\''],
  // Less Than.
  [/&lt;|&#60;/g, '<'],
  // Greater Than.
  [/&gt;|&#62;/g, '>'],
  // Remove other HTML character entities.
  [/&[a-z];|&#.{0,5};/g, '']
];

export interface ConvertHtmlToTextProps {
  html: string;
}

/** Convert HTML into just the text content of the elements. */
export function convertHtmlToText({
  html
}: ConvertHtmlToTextProps): string {
  return textReplacements.reduce((content, [search, replacement]) => {
    return content.replace(search, replacement);
  }, html);
}
