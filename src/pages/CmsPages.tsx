import { useState } from 'react'
import { FileText, Pencil, PlusCircle } from 'lucide-react'
import { useListCmsPagesQuery, useUpsertCmsPageMutation, type CmsPage } from '@/store/api/cmsApi'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const PREDEFINED_SLUGS = [
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'terms-of-service', label: 'Terms of Service' },
  { slug: 'about-us', label: 'About Us' },
  { slug: 'faq', label: 'FAQ' },
]

interface EditState {
  slug: string
  label: string
  title: string
  content: string
}

export default function CmsPagesPage() {
  const { data: pages, isLoading } = useListCmsPagesQuery()
  const [upsertPage, { isLoading: saving }] = useUpsertCmsPageMutation()
  const [edit, setEdit] = useState<EditState | null>(null)

  const pageMap = new Map<string, CmsPage>(pages?.map(p => [p.slug, p]) ?? [])

  const openEditor = (slug: string, label: string) => {
    const existing = pageMap.get(slug)
    setEdit({ slug, label, title: existing?.title ?? label, content: existing?.content ?? '' })
  }

  const handleSave = async () => {
    if (!edit) return
    if (!edit.title.trim()) return toast.error('Title is required')
    try {
      await upsertPage({ slug: edit.slug, body: { title: edit.title, content: edit.content } }).unwrap()
      toast.success('Page saved')
      setEdit(null)
    } catch {
      toast.error('Failed to save page')
    }
  }

  return (
    <div>
      <PageHeader title="CMS Pages" description="Manage public content pages" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 w-full rounded-xl" />)
          : PREDEFINED_SLUGS.map(({ slug, label }) => {
              const page = pageMap.get(slug)
              return (
                <Card key={slug} className="relative">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
                        <FileText className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-slate-900">{label}</p>
                          <Badge variant={page ? 'success' : 'warning'}>
                            {page ? 'Published' : 'Empty'}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{slug}</p>
                        {page && (
                          <p className="text-xs text-slate-400 mt-1">Updated {formatDate(page.updatedAt)}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1.5"
                        onClick={() => openEditor(slug, label)}
                      >
                        {page ? <Pencil className="h-3.5 w-3.5" /> : <PlusCircle className="h-3.5 w-3.5" />}
                        {page ? 'Edit Content' : 'Create Page'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
      </div>

      <Dialog open={!!edit} onOpenChange={o => { if (!o) setEdit(null) }}>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>{edit?.label}</DialogTitle>
          </DialogHeader>
          <DialogBody className="space-y-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                value={edit?.title ?? ''}
                onChange={e => setEdit(s => s ? { ...s, title: e.target.value } : s)}
                placeholder="Page title"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Content</Label>
              <Textarea
                value={edit?.content ?? ''}
                onChange={e => setEdit(s => s ? { ...s, content: e.target.value } : s)}
                placeholder="Write the page content here…"
                className="min-h-[280px] font-mono text-sm"
              />
              <p className="text-xs text-slate-400">Plain text or Markdown is supported.</p>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>Save Page</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
