export type DialogueBlock =
  | { kind: 'speaker'; text: string }
  | { kind: 'question'; text: string }
  | { kind: 'response'; text: string }
  | { kind: 'credit'; text: string }
  | { kind: 'footnote'; text: string }

function isSpeaker(text: string): boolean {
  return /^(Hans Ulrich Obrist|Herbert Stattler|HUO|HS):$/.test(text.trim())
}

function isHuoSpeaker(text: string): boolean {
  return /^(Hans Ulrich Obrist|HUO):$/.test(text.trim())
}

function isFootnote(text: string): boolean {
  return /^\[\d+\]/.test(text.trim())
}

function isCredit(text: string): boolean {
  const trimmed = text.trim()
  return trimmed === 'Herbert Stattler' || trimmed === 'Translation Katherine Robinson'
}

/** Strip trailing inline footnote markers copied from the source site (e.g. "start.1" → "start.") */
export function stripInlineFootnoteMarkers(text: string): string {
  return text.replace(/(?<=[.?!])\d+$/, '')
}

export function classifyDialogueParagraphs(paragraphs: string[]): DialogueBlock[] {
  const blocks: DialogueBlock[] = []
  let expectQuestion = false

  for (const raw of paragraphs) {
    const text = raw.trim()
    if (isFootnote(text)) {
      blocks.push({ kind: 'footnote', text })
      expectQuestion = false
      continue
    }
    if (isCredit(text)) {
      blocks.push({ kind: 'credit', text })
      expectQuestion = false
      continue
    }
    if (isSpeaker(text)) {
      blocks.push({ kind: 'speaker', text })
      expectQuestion = isHuoSpeaker(text)
      continue
    }
    if (expectQuestion) {
      blocks.push({ kind: 'question', text })
      expectQuestion = false
      continue
    }
    blocks.push({ kind: 'response', text })
  }

  return blocks
}
