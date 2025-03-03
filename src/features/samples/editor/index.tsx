import { lazy, MouseEvent, Suspense, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useLangStore } from '@/stores/lang-store.ts'
import { PageContainer } from '@/components/layout/page-container.tsx'
import { Main } from '@/components/layout/main.tsx'
import PageContent from '@/components/page-content.tsx'
import { EditorPrimaryButtons } from '@/features/samples/editor/components'
import { defaultEditorValue } from '@/features/samples/editor/data.mock.ts'

const QuillEditor = lazy(() => import('@/components/quill-editor.tsx'))

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
          <Suspense fallback={<div>Loading...</div>}>
            <QuillEditor value={editorValue} setValue={setEditorValue} />
          </Suspense>
        </PageContent>
      </Main>
    </PageContainer>
  )
}
