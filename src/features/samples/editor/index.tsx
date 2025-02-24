import { MouseEvent, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useLangStore } from '@/stores/langStore.ts'
import { PageContainer } from '@/components/layout/page-container.tsx'
import { ReactCKEditor } from '@/components/ck-editor.tsx'
import { Main } from '@/components/layout/main.tsx'
import PageContent from '@/components/page-content.tsx'
import { EditorPrimaryButtons } from '@/features/samples/editor/components'
import { defaultEditorValue } from '@/features/samples/editor/data.mock.ts'

export default function SampleEditor() {
  const { setLangKey } = useLangStore()
  const intl = useIntl()
  const [editorValue, setEditorValue] = useState<string>(defaultEditorValue)

  const handleOnClickSave = (_: MouseEvent<HTMLButtonElement>) => {
    console.log('Save button clicked', editorValue)
  }

  useEffect(() => setLangKey('samples'), [])

  return (
    <PageContainer title={intl.formatMessage({ id: 'editor.title' })}>
      <Main>
        <PageContent
          title={intl.formatMessage({ id: 'editor.title' })}
          description={intl.formatMessage({ id: 'editor.description' })}
          headerChildren={<EditorPrimaryButtons onClick={handleOnClickSave}/>}
        >
          <ReactCKEditor value={editorValue} setValue={setEditorValue} />
        </PageContent>
      </Main>
    </PageContainer>
  )
}
