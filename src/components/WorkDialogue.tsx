import { classifyDialogueParagraphs, stripInlineFootnoteMarkers } from '../lib/dialogueParagraphs'

function decodeText(text: string) {
  return text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export function WorkDialogue({ paragraphs }: { paragraphs: string[] }) {
  const blocks = classifyDialogueParagraphs(paragraphs)
  const body = blocks.filter((block) => block.kind !== 'footnote')
  const footnotes = blocks.filter((block) => block.kind === 'footnote')

  return (
    <div className="work-page__dialogue">
      {body.map((block, index) => {
        if (block.kind === 'speaker') {
          return (
            <p key={index} className="work-page__dialogue-speaker">
              {decodeText(block.text)}
            </p>
          )
        }
        if (block.kind === 'question') {
          return (
            <p key={index} className="work-page__dialogue-question">
              {decodeText(stripInlineFootnoteMarkers(block.text))}
            </p>
          )
        }
        if (block.kind === 'credit') {
          return (
            <p key={index} className="work-page__dialogue-credit">
              {decodeText(block.text)}
            </p>
          )
        }
        return (
          <p key={index} className="work-page__dialogue-response">
            {decodeText(stripInlineFootnoteMarkers(block.text))}
          </p>
        )
      })}

      {footnotes.length > 0 && (
        <div className="work-page__footnotes" aria-label="Footnotes">
          {footnotes.map((block, index) => (
            <p key={index} className="work-page__footnote">
              {decodeText(block.text)}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
